'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getRFQWhatsappLink, normalizeRFQItem, readRFQItems, writeRFQItems } from '@/lib/rfq';
import { requestChecklist, resolveScopeResult, type ScopeAnswers } from '@/content/scope-finder';

type Option = { value: ScopeAnswers[keyof ScopeAnswers]; label: string; helper?: string };
type Question = {
  key: keyof ScopeAnswers;
  label: string;
  options: Option[];
};

const questions: Question[] = [
  {
    key: 'environment',
    label: 'What type of environment are you planning for?',
    options: [
      { value: 'office-commercial', label: 'Office / Commercial Space' },
      { value: 'school-training', label: 'School / Training Facility' },
      { value: 'warehouse-factory', label: 'Warehouse / Factory' },
      { value: 'data-room', label: 'Data Room / Technical Room', helper: 'For cabinet layout, cable paths, and rack readiness.' },
      { value: 'retail-branch', label: 'Retail / Branch Location' },
      { value: 'cctv-security', label: 'CCTV / Security Infrastructure' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'mainNeed',
    label: 'What is the main need?',
    options: [
      { value: 'new-network', label: 'New network installation' },
      { value: 'upgrade-network', label: 'Upgrade existing network' },
      { value: 'fiber-backbone', label: 'Fiber backbone / inter-floor connection', helper: 'For linking floors, buildings, or data rooms.' },
      { value: 'cctv-readiness', label: 'CCTV and security readiness' },
      { value: 'data-room-organization', label: 'Data room / rack organization', helper: 'For cabinets, patch panels, ODFs, PDU, and cable management.' },
      { value: 'product-supply-only', label: 'Product supply only' },
      { value: 'testing-validation', label: 'Testing and validation', helper: 'For Fluke/OTDR-oriented checks before handover.' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'scale',
    label: 'Approximate scale?',
    options: [
      { value: 'small', label: 'Small: under 20 endpoints/cameras' },
      { value: 'medium', label: 'Medium: 20–80 endpoints/cameras' },
      { value: 'large', label: 'Large: 80+ endpoints/cameras' },
      { value: 'multi-floor', label: 'Multi-floor / multi-zone' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'supplyMode',
    label: 'Do you need HILTECH to supply products?',
    options: [
      { value: 'supply-install', label: 'Yes, supply and installation' },
      { value: 'supply-only', label: 'Product supply only' },
      { value: 'install-only', label: 'Installation only' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'cctv',
    label: 'Do you need CCTV/security?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe-later', label: 'Maybe later' },
    ],
  },
  {
    key: 'testing',
    label: 'Is testing/handover validation required?',
    options: [
      { value: 'full-testing', label: 'Yes, include testing/reporting', helper: 'Includes validation-oriented handover checks.' },
      { value: 'basic-handover', label: 'Basic handover only' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
  },
  {
    key: 'urgency',
    label: 'How urgent is the request?',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'urgent', label: 'Urgent' },
      { value: 'planning', label: 'Planning stage only' },
    ],
  },
];

const initial: ScopeAnswers = { environment: 'not-sure', mainNeed: 'not-sure', scale: 'not-sure', supplyMode: 'not-sure', cctv: 'maybe-later', testing: 'not-sure', urgency: 'standard' };

const optionLabelByValue = questions.reduce<Record<string, string>>((acc, question) => {
  question.options.forEach((option) => {
    acc[option.value] = option.label;
  });
  return acc;
}, {});

export default function ScopeFinderClient() {
  const [answers, setAnswers] = useState<ScopeAnswers>(initial);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [addFeedback, setAddFeedback] = useState<string | null>(null);
  const [addedOnce, setAddedOnce] = useState(false);

  const result = useMemo(() => resolveScopeResult(answers), [answers]);
  const current = questions[step];
  const progressPercent = Math.round(((step + 1) / questions.length) * 100);

  const whyBullets = useMemo(() => {
    return [
      `You selected ${optionLabelByValue[answers.environment]}.`,
      `You selected ${optionLabelByValue[answers.mainNeed]}.`,
      `You selected ${optionLabelByValue[answers.scale]}.`,
      answers.testing === 'full-testing' ? 'You requested testing/reporting support.' : `You selected ${optionLabelByValue[answers.testing]}.`,
    ];
  }, [answers]);

  const fitBadge = useMemo(() => {
    const unsureCount = Object.values(answers).filter((value) => value === 'not-sure').length;
    if (unsureCount >= 3) return 'Needs confirmation';
    if (answers.urgency === 'planning' || answers.supplyMode === 'not-sure') return 'Planning fit';
    return 'High fit';
  }, [answers]);

  const addStarterItems = () => {
    if (addedOnce) return;
    const existing = readRFQItems();
    const existingKeys = new Set(existing.map((item) => `${item.name.toLowerCase()}::${item.category.toLowerCase()}`));
    const newItems = result.starterItems
      .filter((item) => !existingKeys.has(`${item.name.toLowerCase()}::${item.category.toLowerCase()}`))
      .map((item, index) =>
        normalizeRFQItem({
          id: `scope-finder-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
          name: item.name,
          category: item.category,
          brand: item.brand,
          quantity: 1,
          unit: item.unit,
          notes: 'Added from Smart Scope Finder',
        }),
      );

    if (newItems.length === 0) {
      setAddFeedback('Starter items already exist in your RFQ Basket.');
      setAddedOnce(true);
      return;
    }

    writeRFQItems([...existing, ...newItems]);
    setAddedOnce(true);
    setAddFeedback(`${newItems.length} starter item${newItems.length > 1 ? 's' : ''} added to your RFQ Basket.`);
  };

  return (
    <div className="hiltech-scope-finder" data-scope-finder>
      {!showResult ? (
        <section className="hiltech-scope-workspace" data-scope-question>
          <div className="hiltech-scope-progress">
            <div>
              <span>STEP {String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</span>
              <strong>{progressPercent}%</strong>
            </div>
            <i>
              <b style={{ width: progressPercent + '%' }} />
            </i>
          </div>

          <fieldset className="hiltech-scope-question">
            <legend>{current.label}</legend>

            <div className="hiltech-scope-option-index">
              {current.options.map((option, index) => {
                const selected = answers[current.key] === option.value;
                return (
                  <label key={option.value} className={selected ? 'is-selected' : undefined}>
                    <input
                      type="radio"
                      name={current.key}
                      checked={selected}
                      onChange={() =>
                        setAnswers((prev) => ({ ...prev, [current.key]: option.value as never }))
                      }
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <strong>{option.label}</strong>
                      {option.helper ? <p>{option.helper}</p> : null}
                    </div>
                    <em aria-hidden="true">{selected ? 'ACTIVE' : 'SELECT'}</em>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="hiltech-scope-actions">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              BACK <span aria-hidden="true">←</span>
            </button>

            {step < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((value) => Math.min(questions.length - 1, value + 1))}
              >
                NEXT <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button type="button" onClick={() => setShowResult(true)}>
                RESOLVE PRELIMINARY SCOPE <span aria-hidden="true">↗</span>
              </button>
            )}
          </div>

          <p className="hiltech-scope-disclaimer">
            No pricing, compatibility approval, or final project classification is generated here.
            HILTECH confirms the scope before quotation.
          </p>
        </section>
      ) : null}

      {showResult ? (
        <section className="hiltech-scope-result" data-scope-result>
          <div className="hiltech-utility-section-label">
            <span>02 / PRELIMINARY RESULT</span>
            <strong>{fitBadge.toUpperCase()}</strong>
          </div>

          <div className="hiltech-scope-result-head">
            <div>
              <span>DIRECTION</span>
              <h2>{result.title}</h2>
              <p>{result.explanation}</p>
            </div>
            <button type="button" onClick={() => setShowResult(false)}>
              REVIEW ANSWERS <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="hiltech-scope-evidence">
            <span>WHY THIS DIRECTION</span>
            <div>
              {whyBullets.map((bullet, index) => (
                <p key={bullet}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {bullet}
                </p>
              ))}
            </div>
          </div>

          <div className="hiltech-scope-route-grid">
            <div>
              <span>RECOMMENDED SOLUTIONS</span>
              <nav>
                {result.solutionSlugs.map((slug, index) => (
                  <Link key={slug} href={'/solutions/' + slug}>
                    <b>{String(index + 1).padStart(2, '0')}</b>
                    <strong>{slug.replaceAll('-', ' ')}</strong>
                    <em>↗</em>
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <span>TECHNICAL PRODUCT CONTEXT</span>
              <nav>
                {result.productSlugs.map((slug, index) => (
                  <Link key={slug} href={'/products-partners/intelligence/' + slug}>
                    <b>{String(index + 1).padStart(2, '0')}</b>
                    <strong>{slug.replaceAll('-', ' ')}</strong>
                    <em>↗</em>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="hiltech-scope-result-ledger">
            <article>
              <span>03 / STARTER REFERENCES</span>
              <div>
                <strong>PRELIMINARY RFQ STARTER ITEMS</strong>
                <ul>
                  {result.starterItems.map((item) => (
                    <li key={item.name}>{item.name} / {item.category}</li>
                  ))}
                </ul>
              </div>
            </article>

            <article>
              <span>04 / REQUEST INPUTS</span>
              <div>
                <strong>WHAT TO INCLUDE BEFORE REVIEW</strong>
                <ul>
                  {requestChecklist.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          </div>

          <p className="hiltech-scope-disclaimer">
            This is a preliminary scope suggestion. Final product selection, availability,
            compatibility, and quotation must be confirmed by HILTECH.
          </p>

          <div className="hiltech-utility-actions">
            <button type="button" onClick={addStarterItems} disabled={addedOnce}>
              {addedOnce ? 'STARTER ITEMS ADDED' : 'ADD STARTER ITEMS TO RFQ'} <span aria-hidden="true">↗</span>
            </button>
            <Link href="/rfq">REVIEW RFQ <span aria-hidden="true">↗</span></Link>
            <a href={getRFQWhatsappLink(readRFQItems())}>WHATSAPP HILTECH <span aria-hidden="true">↗</span></a>
          </div>

          {addFeedback ? (
            <p className="hiltech-scope-feedback">
              {addFeedback} <Link href="/rfq">Review RFQ ↗</Link>
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
