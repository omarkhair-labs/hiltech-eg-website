'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import { arRFQMessages, type RFQMessages } from '@/content/ar/rfq';
import { products as catalogProducts } from '@/content/products';
import {
  getBestMatchingBundleForBasket,
  getMissingBundleRequirements,
  getSuggestedProductsForMissingRequirements,
} from '@/lib/project-bundles';
import {
  buildRFQWhatsappMessage,
  getRFQWhatsappLink,
  MAX_RFQ_QUANTITY,
  MIN_RFQ_QUANTITY,
  normalizeRFQItem,
  normalizeRFQQuantity,
  readRFQItems,
  writeRFQItems,
  type RFQItem,
  type RFQProjectDetails,
} from '@/lib/rfq';
import { isValidEgyptPhone } from '@/lib/phone';

const en = {
  pageTitle: 'Request Project Quote',
  pageSubtitle:
    'Review your selected products, add quantities and project details, then submit your RFQ to HILTECH for quotation follow-up.',
  step1: '1. Review items',
  step2: '2. Add project details',
  step3: '3. Submit & track',
  itemsCardTitle: 'Selected items',
  basketTitle: 'RFQ Summary',
  projectDetails: 'Project details',
  submitSectionTitle: 'Submit RFQ request',
  fullName: 'Full name',
  phoneNumber: 'Phone',
  emailAddress: 'Email',
  companyName: 'Company',
  projectLocation: 'Project location',
  projectNotes: 'Project notes',
  submitRFQ: 'Submit RFQ Request',
  submitting: 'Saving RFQ...',
  emptyBasket:
    'Your RFQ basket is empty. Add products first to prepare a structured quotation request.',
  browseProducts: 'Browse Products',
  contactHelper: 'Need help preparing your request?',
  contactHiltech: 'Contact HILTECH',
  emptyStateTitle: 'Your RFQ basket is empty',
  emptyStateBody: 'Add products to submit an itemized RFQ, or send a project-only request below.',
  projectOnlyTitle: 'No product list yet?',
  projectOnlyBody: 'You can still send your project scope manually and our team will help build the BOQ with you.',
  sendProjectOnly: 'Send Project-Only Request',
  addItemsToSubmit: 'Add at least one product to enable RFQ submission.',
  quantity: 'Quantity',
  remove: 'Remove',
  reference: 'Reference',
  trackThisRFQ: 'Track this RFQ',
  sendViaWhatsapp: 'Send via WhatsApp',
  sendViaWhatsappToo: 'Send via WhatsApp too',
  backToProducts: 'Back to Products',
  successTitle: 'RFQ submitted successfully',
  successBody: 'Save this reference to track your request later.',
  finalQuotationNote: 'Final quotation confirmed after RFQ review.',
  priceReference: 'Price ref',
  priceOnRequest: 'Price on request',
  availabilityNote: 'Availability confirmed during RFQ review',
  fullNameRequired: 'Enter your full name.',
  phoneRequired: 'Enter a valid Egyptian phone number.',
  emailRequired: 'Email address is required.',
  invalidEmail: 'Enter a valid email address.',
  quantityError: 'Quantity must be between 1 and 9999.',
  submitError: "We couldn’t save your RFQ right now. You can still send it via WhatsApp.",
  serverValidationPrefix: 'Please review:',
  prepareHint:
    'For faster quotation, include site location, quantities, rack/fiber/CCTV scope, and any BOQ or project notes.',
  nextTitle: 'What happens after submission?',
  nextPoint1: 'HILTECH reviews your items, quantities, and project notes.',
  nextPoint2: 'Availability and suitable alternatives are confirmed.',
  nextPoint3: 'The team contacts you by phone or WhatsApp if clarification is needed.',
  nextPoint4: 'You receive quotation follow-up and can track the RFQ using your reference.',
  scopeCompletion: 'Scope completion',
  requiredItemsCovered: 'required scope items covered',
  missingFromScope: 'Missing from this scope',
  scopeComplete: 'Scope complete',
  addRecommendation: 'Add',
} as const;

export default function RFQReviewClient({
  locale = 'en',
  messages,
  productsHref = '/products-partners',
  trackHrefBase = '/track',
  contactHref = '/contact',
}: {
  locale?: 'en' | 'ar';
  messages?: RFQMessages;
  productsHref?: string;
  trackHrefBase?: string;
  contactHref?: string;
}) {
  const t = (locale === 'ar' ? messages || arRFQMessages : en) as typeof en;
  const [items, setItems] = useState<RFQItem[]>([]);
  const [project, setProject] = useState<RFQProjectDetails>({});
  const [submitState, setSubmitState] = useState<{
    status: 'idle' | 'submitting' | 'error' | 'success';
    requestCode?: string;
    message?: string;
  }>({ status: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quantityError, setQuantityError] = useState('');
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + normalizeRFQQuantity(item.quantity), 0),
    [items],
  );
  const isBasketEmpty = items.length === 0;
  const bestBundleMatch = useMemo(() => getBestMatchingBundleForBasket(items), [items]);
  const missingRequirements = useMemo(
    () => (bestBundleMatch ? getMissingBundleRequirements(bestBundleMatch.bundle, items) : []),
    [bestBundleMatch, items],
  );
  const missingSuggestions = useMemo(
    () => (bestBundleMatch
      ? getSuggestedProductsForMissingRequirements(bestBundleMatch.bundle, items, catalogProducts)
      : []),
    [bestBundleMatch, items],
  );

  const addSuggestedItem = (productId: string) => {
    const product = catalogProducts.find((entry) => entry.id === productId);
    if (!product) return;
    setItems((previous) => {
      if (previous.some((entry) => entry.id === product.id)) return previous;
      const next = [
        ...previous,
        normalizeRFQItem({
          id: product.id,
          name: product.name,
          category: product.category,
          brand: product.brand,
          specs: product.shortSpecs,
          quantity: 1,
          priceNote: product.priceNote,
        }),
      ];
      trackEvent('aov_missing_item_add', {
        product_id: product.id,
        bundle_id: bestBundleMatch ? bestBundleMatch.bundle.id : 'none',
        source: 'rfq_review',
      });
      return next;
    });
  };

  const updateItem = (id: string, patch: Partial<RFQItem>) => {
    setItems((previous) =>
      previous.map((entry) =>
        entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry,
      ),
    );
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!project.fullName?.trim()) nextErrors.fullName = t.fullNameRequired;
    if (!project.phoneNumber?.trim() || !isValidEgyptPhone(project.phoneNumber)) {
      nextErrors.phoneNumber = t.phoneRequired;
    }
    if (!project.emailAddress?.trim()) nextErrors.emailAddress = t.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.emailAddress.trim())) {
      nextErrors.emailAddress = t.invalidEmail;
    }

    setErrors(nextErrors);
    const first = Object.keys(nextErrors)[0];
    if (first === 'fullName') fullNameRef.current?.focus();
    if (first === 'phoneNumber') phoneRef.current?.focus();
    if (first === 'emailAddress') emailRef.current?.focus();
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async () => {
    if (isBasketEmpty) {
      setSubmitState({ status: 'error', message: t.addItemsToSubmit });
      return;
    }
    if (!validate()) return;

    const normalizedItems = items.map((item) => normalizeRFQItem(item));
    if (
      normalizedItems.some(
        (item) => item.quantity < MIN_RFQ_QUANTITY || item.quantity > MAX_RFQ_QUANTITY,
      )
    ) {
      setQuantityError(t.quantityError);
      return;
    }

    setSubmitState({ status: 'submitting' });

    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: project.fullName,
            companyName: project.companyName,
            phone: project.phoneNumber,
            email: project.emailAddress,
            projectLocation: project.projectLocation,
            projectNotes: project.projectNotes,
            requestType: null,
          },
          items: normalizedItems.map((item) => ({
            productId: item.id,
            name: item.name,
            category: item.category,
            brand: item.brand,
            quantity: item.quantity,
            unit: item.unit,
            urgency: item.urgency,
            notes: item.notes,
          })),
          urgency: null,
          source: 'rfq_page',
          whatsappMessage: buildRFQWhatsappMessage(normalizedItems, project),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok || !data.requestCode) {
        const details = Array.isArray(data?.issues)
          ? data.issues
              .map((issue: { path?: string[]; message?: string }) => issue?.message)
              .filter((message: string | undefined): message is string => Boolean(message))
          : [];
        throw new Error(
          details.length ? \`\${t.serverValidationPrefix} \${details.join(' ')}\` : t.submitError,
        );
      }

      setSubmitState({ status: 'success', requestCode: data.requestCode });
      trackEvent('rfq_submit_success', {
        item_count: items.length,
        total_units: count,
        source: 'rfq_page',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error && error.message ? error.message : t.submitError,
      });
    }
  };

  const flowState = submitState.status === 'success'
    ? 'received'
    : isBasketEmpty
      ? 'empty'
      : 'draft';

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="hiltech-rfq-flow"
      data-rfq-flow
      data-rfq-state={flowState}
    >
      <header className="hiltech-rfq-hero" data-rfq-hero>
        <div className="hiltech-rfq-topline">
          <span>PROJECT REQUEST / RFQ</span>
          <strong>{flowState.toUpperCase()}</strong>
        </div>

        <div className="hiltech-rfq-hero-grid">
          <div>
            <span>{t.pageTitle}</span>
            <h1>
              TURN THE SYSTEM<br />
              <em>INTO A REQUEST.</em>
            </h1>
            <p>{t.pageSubtitle}</p>
          </div>

          <div className="hiltech-rfq-live-state">
            <div>
              <span>REFERENCES</span>
              <strong>{items.length}</strong>
              <small>EXACT LINES IN THIS REQUEST</small>
            </div>
            <div>
              <span>UNITS</span>
              <strong>{count}</strong>
              <small>EDITABLE BEFORE SUBMISSION</small>
            </div>
            <div>
              <span>QUOTE STATE</span>
              <strong>REVIEW</strong>
              <small>PRICE / AVAILABILITY CONFIRMED LATER</small>
            </div>
          </div>
        </div>

        <div className="hiltech-rfq-steps" aria-label="RFQ steps">
          <span>01 / REFERENCES</span><i />
          <span>02 / PROJECT SHEET</span><i />
          <span>03 / SUBMIT</span><i />
          <span>04 / TRACK</span>
        </div>
      </header>

      {submitState.status === 'success' && submitState.requestCode ? (
        <section className="hiltech-rfq-receipt" data-rfq-success>
          <div>
            <span>REQUEST RECEIVED</span>
            <h2>
              SAVE THE<br />
              <em>REFERENCE.</em>
            </h2>
            <p>{t.successBody}</p>
          </div>
          <div className="hiltech-rfq-receipt-code">
            <span>{t.reference}</span>
            <strong dir="ltr">{submitState.requestCode}</strong>
            <small>USE THIS CODE WITH THE SAME PHONE OR EMAIL TO TRACK THE REQUEST.</small>
          </div>
          <nav>
            <Link href={\`\${trackHrefBase}?request_code=\${encodeURIComponent(submitState.requestCode)}\`}>
              {t.trackThisRFQ} <span aria-hidden="true">↗</span>
            </Link>
            <Link href={productsHref}>{t.backToProducts} <span aria-hidden="true">↗</span></Link>
            <a href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">
              {t.sendViaWhatsappToo} <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </section>
      ) : (
        <>
          <section className="hiltech-rfq-ledger" data-rfq-ledger>
            <div className="hiltech-rfq-section-label">
              <span>01 / REFERENCE LEDGER</span>
              <strong>EXACT CODES / QUANTITY / ITEM NOTE</strong>
            </div>

            {isBasketEmpty ? (
              <div className="hiltech-rfq-empty" data-rfq-empty>
                <div>
                  <span>EMPTY REQUEST</span>
                  <h2>
                    START WITH<br />
                    <em>THE PHYSICAL LIBRARY.</em>
                  </h2>
                </div>
                <div>
                  <p>{t.emptyStateBody}</p>
                  <Link href={productsHref}>{t.browseProducts} <span aria-hidden="true">↗</span></Link>
                  <a href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">
                    {t.sendProjectOnly} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="hiltech-rfq-reference-index">
                {items.map((item, index) => (
                  <article key={item.id} data-rfq-item>
                    <span>{String(index + 1).padStart(2, '0')}</span>

                    <div className="hiltech-rfq-reference-main">
                      <small>{item.id}</small>
                      <h3>{item.name}</h3>
                      <p>{item.category} / {item.brand}</p>
                    </div>

                    <div className="hiltech-rfq-reference-commercial">
                      <span>{t.priceReference}</span>
                      <strong>{item.priceNote || t.priceOnRequest}</strong>
                      <small>{t.availabilityNote}</small>
                    </div>

                    <div className="hiltech-rfq-quantity" aria-label={t.quantity}>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateItem(item.id, {
                            quantity: normalizeRFQQuantity(item.quantity - 1),
                          })
                        }
                      >
                        −
                      </button>
                      <strong>{item.quantity}</strong>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateItem(item.id, {
                            quantity: normalizeRFQQuantity(item.quantity + 1),
                          })
                        }
                      >
                        +
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={item.notes}
                      onChange={(event) => updateItem(item.id, { notes: event.target.value })}
                      placeholder="Item note / variant / location"
                      aria-label={\`\${item.name} item note\`}
                    />

                    <button
                      type="button"
                      className="hiltech-rfq-remove"
                      onClick={() =>
                        setItems((previous) => previous.filter((entry) => entry.id !== item.id))
                      }
                    >
                      {t.remove}
                    </button>
                  </article>
                ))}
              </div>
            )}

            {quantityError ? <p className="hiltech-rfq-error">{quantityError}</p> : null}
          </section>

          {bestBundleMatch ? (
            <section className="hiltech-rfq-scope" data-rfq-scope>
              <div className="hiltech-rfq-section-label">
                <span>02 / SCOPE SIGNAL</span>
                <strong>BEST CURRENT MATCH / NOT A FINAL PROJECT CLASSIFICATION</strong>
              </div>

              <div className="hiltech-rfq-scope-grid">
                <div>
                  <span>{t.scopeCompletion}</span>
                  <h2>{bestBundleMatch.bundle.title}</h2>
                  <p>
                    {bestBundleMatch.completion.completedRequiredCount} of{' '}
                    {bestBundleMatch.completion.totalRequiredCount} {t.requiredItemsCovered}
                  </p>
                </div>
                <div>
                  <strong>{bestBundleMatch.completion.completionPercentage}%</strong>
                  <span>{missingRequirements.length ? t.missingFromScope : t.scopeComplete}</span>
                </div>
              </div>

              {missingSuggestions.length ? (
                <div className="hiltech-rfq-scope-suggestions">
                  {missingSuggestions.map((suggestion, index) => (
                    <div key={suggestion.id}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <small>{suggestion.id}</small>
                        <strong>{suggestion.name}</strong>
                      </div>
                      <button type="button" onClick={() => addSuggestedItem(suggestion.id)}>
                        {t.addRecommendation} +
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="hiltech-rfq-project-sheet" data-rfq-project>
            <div className="hiltech-rfq-section-label">
              <span>03 / PROJECT SHEET</span>
              <strong>IDENTITY / LOCATION / CONTEXT</strong>
            </div>

            <div className="hiltech-rfq-project-grid">
              <div>
                <h2>
                  ADD THE CONTEXT<br />
                  <em>THE PART LIST CANNOT.</em>
                </h2>
                <p>{t.prepareHint}</p>
              </div>

              <div className="hiltech-rfq-fields">
                <label>
                  <span>{t.fullName}</span>
                  <input
                    ref={fullNameRef}
                    type="text"
                    data-rfq-field="fullName"
                    value={project.fullName || ''}
                    onChange={(event) =>
                      setProject((previous) => ({ ...previous, fullName: event.target.value }))
                    }
                  />
                  {errors.fullName ? <small>{errors.fullName}</small> : null}
                </label>

                <label>
                  <span>{t.phoneNumber}</span>
                  <input
                    ref={phoneRef}
                    type="tel"
                    dir="ltr"
                    data-rfq-field="phoneNumber"
                    value={project.phoneNumber || ''}
                    onChange={(event) =>
                      setProject((previous) => ({
                        ...previous,
                        phoneNumber: event.target.value,
                      }))
                    }
                  />
                  {errors.phoneNumber ? <small>{errors.phoneNumber}</small> : null}
                </label>

                <label>
                  <span>{t.emailAddress}</span>
                  <input
                    ref={emailRef}
                    type="email"
                    dir="ltr"
                    data-rfq-field="emailAddress"
                    value={project.emailAddress || ''}
                    onChange={(event) =>
                      setProject((previous) => ({
                        ...previous,
                        emailAddress: event.target.value,
                      }))
                    }
                  />
                  {errors.emailAddress ? <small>{errors.emailAddress}</small> : null}
                </label>

                <label>
                  <span>{t.companyName}</span>
                  <input
                    type="text"
                    data-rfq-field="companyName"
                    value={project.companyName || ''}
                    onChange={(event) =>
                      setProject((previous) => ({
                        ...previous,
                        companyName: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="is-wide">
                  <span>{t.projectLocation}</span>
                  <input
                    type="text"
                    data-rfq-field="projectLocation"
                    value={project.projectLocation || ''}
                    onChange={(event) =>
                      setProject((previous) => ({
                        ...previous,
                        projectLocation: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="is-wide">
                  <span>{t.projectNotes}</span>
                  <textarea
                    rows={5}
                    data-rfq-field="projectNotes"
                    value={project.projectNotes || ''}
                    onChange={(event) =>
                      setProject((previous) => ({
                        ...previous,
                        projectNotes: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="hiltech-rfq-submit" data-rfq-submit>
            <div>
              <span>04 / SUBMISSION GATE</span>
              <h2>
                THE REQUEST IS<br />
                <em>NOT THE QUOTE.</em>
              </h2>
              <p>{t.finalQuotationNote}</p>
            </div>

            <div>
              {isBasketEmpty ? (
                <>
                  <p>{t.addItemsToSubmit}</p>
                  <Link href={productsHref}>{t.browseProducts} <span aria-hidden="true">↗</span></Link>
                  <a href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">
                    {t.sendProjectOnly} <span aria-hidden="true">↗</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitState.status === 'submitting'}
                    data-rfq-submit-button
                  >
                    {submitState.status === 'submitting' ? t.submitting : t.submitRFQ}
                    <span aria-hidden="true">↗</span>
                  </button>
                  <a href={getRFQWhatsappLink(items, project)} target="_blank" rel="noopener noreferrer">
                    {t.sendViaWhatsapp} <span aria-hidden="true">↗</span>
                  </a>
                </>
              )}

              {submitState.status === 'error' ? (
                <p className="hiltech-rfq-error" data-rfq-submit-error>{submitState.message}</p>
              ) : null}

              <div className="hiltech-rfq-help">
                <span>{t.contactHelper}</span>
                <Link href={contactHref}>{t.contactHiltech} ↗</Link>
              </div>
            </div>
          </section>

          <section className="hiltech-rfq-after" data-rfq-after>
            <div className="hiltech-rfq-section-label is-dark">
              <span>05 / AFTER SUBMISSION</span>
              <strong>REVIEW / CLARIFY / QUOTE / TRACK</strong>
            </div>
            <div className="hiltech-rfq-after-grid">
              {[t.nextPoint1, t.nextPoint2, t.nextPoint3, t.nextPoint4].map((point, index) => (
                <div key={point}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{point}</strong>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
