import { Fragment, useMemo, useState, type FC, type ChangeEvent } from "react";
import { Container } from "@/components/Container";

const FEE_CATEGORIES = ["Nursery", "Primary", "Secondary"] as const;

type FeeCategory = (typeof FEE_CATEGORIES)[number];

type FeeRow = {
  category: FeeCategory;
  grade: string;
  tuitionFee: string;
  administrationFee: string;
  optionalCosts: string[];
  totalPerTerm: string;
  searchTerms: string;
};

const FEE_ROWS: FeeRow[] = [
  {
    category: "Nursery",
    grade: "Baby Class",
    tuitionFee: "TZS 1,200,000",
    administrationFee: "TZS 150,000",
    optionalCosts: ["Transport: 180,000", "Lunch: 120,000"],
    totalPerTerm: "TZS 1,650,000",
    searchTerms: "nursery baby class",
  },
  {
    category: "Nursery",
    grade: "Middle Class",
    tuitionFee: "TZS 1,350,000",
    administrationFee: "TZS 150,000",
    optionalCosts: ["Transport: 190,000", "Lunch: 120,000"],
    totalPerTerm: "TZS 1,810,000",
    searchTerms: "nursery middle class",
  },
  {
    category: "Nursery",
    grade: "Pre-Unit",
    tuitionFee: "TZS 1,480,000",
    administrationFee: "TZS 170,000",
    optionalCosts: ["Transport: 200,000", "Lunch: 130,000"],
    totalPerTerm: "TZS 1,980,000",
    searchTerms: "nursery pre unit",
  },
  {
    category: "Primary",
    grade: "Standard 1",
    tuitionFee: "TZS 1,650,000",
    administrationFee: "TZS 200,000",
    optionalCosts: ["Transport: 220,000", "Lunch: 150,000"],
    totalPerTerm: "TZS 2,220,000",
    searchTerms: "primary standard 1 std 1",
  },
  {
    category: "Primary",
    grade: "Standard 2",
    tuitionFee: "TZS 1,730,000",
    administrationFee: "TZS 200,000",
    optionalCosts: ["Transport: 220,000", "Lunch: 150,000"],
    totalPerTerm: "TZS 2,300,000",
    searchTerms: "primary standard 2 std 2",
  },
  {
    category: "Primary",
    grade: "Standard 3",
    tuitionFee: "TZS 1,820,000",
    administrationFee: "TZS 210,000",
    optionalCosts: ["Transport: 230,000", "Lunch: 160,000"],
    totalPerTerm: "TZS 2,420,000",
    searchTerms: "primary standard 3 std 3",
  },
  {
    category: "Primary",
    grade: "Standard 4",
    tuitionFee: "TZS 1,900,000",
    administrationFee: "TZS 210,000",
    optionalCosts: ["Transport: 240,000", "Lunch: 170,000"],
    totalPerTerm: "TZS 2,520,000",
    searchTerms: "primary standard 4 std 4",
  },
  {
    category: "Secondary",
    grade: "Form 1",
    tuitionFee: "TZS 2,100,000",
    administrationFee: "TZS 230,000",
    optionalCosts: ["Transport: 260,000", "Lunch: 180,000"],
    totalPerTerm: "TZS 2,770,000",
    searchTerms: "secondary form 1",
  },
  {
    category: "Secondary",
    grade: "Form 2",
    tuitionFee: "TZS 2,230,000",
    administrationFee: "TZS 230,000",
    optionalCosts: ["Transport: 260,000", "Lunch: 190,000"],
    totalPerTerm: "TZS 2,910,000",
    searchTerms: "secondary form 2",
  },
  {
    category: "Secondary",
    grade: "Form 3",
    tuitionFee: "TZS 2,380,000",
    administrationFee: "TZS 250,000",
    optionalCosts: ["Transport: 280,000", "Lunch: 200,000"],
    totalPerTerm: "TZS 3,110,000",
    searchTerms: "secondary form 3",
  },
  {
    category: "Secondary",
    grade: "Form 4",
    tuitionFee: "TZS 2,480,000",
    administrationFee: "TZS 250,000",
    optionalCosts: ["Transport: 280,000", "Lunch: 210,000"],
    totalPerTerm: "TZS 3,220,000",
    searchTerms: "secondary form 4",
  },
];

export const FeesSection: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [termsExpanded, setTermsExpanded] = useState<boolean>(false);

  const filteredRows = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return FEE_ROWS;
    }

    return FEE_ROWS.filter((row) =>
      row.searchTerms.toLowerCase().includes(normalized) ||
      row.grade.toLowerCase().includes(normalized) ||
      row.category.toLowerCase().includes(normalized)
    );
  }, [searchTerm]);

  const groupedRows = useMemo(() => {
    return FEE_CATEGORIES.map((category) => ({
      category,
      rows: filteredRows.filter((row) => row.category === category),
    })).filter((group) => group.rows.length > 0);
  }, [filteredRows]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="fees-section bg-brand-light py-16 md:py-24">
      <Container className="space-y-12">
        <header className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-green">
            School Fees
          </span>
          <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">
            Transparent Fee Structure
          </h2>
          <p className="text-base text-gray-600 md:max-w-2xl">
            Understand the investment required for each learning stage. Filter
            by class or grade to locate the exact fees your family needs to plan
            for the year ahead.
          </p>
          <p className="text-sm font-semibold text-brand-brown">
            All fees are quoted in Tanzanian Shillings (TZS) per term.
          </p>
        </header>

        <section className="rounded-lg border border-gray-200 bg-white shadow-base">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-brand-dark">
                Fee Structure
              </h3>
              <p className="text-sm text-gray-500">
                Search by class or grade to quickly surface the right term fees.
              </p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[18rem]">
              <label htmlFor="fees-search" className="sr-only">
                Search fees
              </label>
              <div className="relative">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  id="fees-search"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search class or grade"
                  className="w-full rounded-lg border border-gray-300 px-10 py-2.5 text-sm text-brand-dark shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-brand-light/70 text-xs font-semibold uppercase tracking-wider text-brand-dark">
                <tr>
                  <th scope="col" className="px-6 py-3 text-brand-dark">
                    Grade / Class
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-right text-brand-dark">
                    Tuition Fee
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-right text-brand-dark">
                    Administration
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-right text-brand-dark">
                    Optional Costs
                  </th>
                  <th scope="col" className="whitespace-nowrap px-6 py-3 text-right text-brand-dark">
                    Total / Term
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {groupedRows.map((group) => (
                  <Fragment key={`group-${group.category}`}>
                    <tr className="bg-brand-light/60 text-xs font-semibold uppercase tracking-wide text-brand-brown">
                      <td colSpan={5} className="px-6 py-3">
                        {group.category}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={`${row.category}-${row.grade}`}
                        className="bg-white transition hover:bg-brand-light"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-semibold text-brand-dark md:whitespace-normal"
                        >
                          {row.grade}
                        </th>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-brand-dark">
                          {row.tuitionFee}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-brand-dark">
                          {row.administrationFee}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          <div className="space-y-1 whitespace-nowrap">
                            {row.optionalCosts.map((cost) => (
                              <div key={`${row.grade}-${cost}`}>{cost}</div>
                            ))}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-brand-dark">
                          {row.totalPerTerm}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {groupedRows.length === 0 && (
            <p className="px-6 py-4 text-sm font-medium text-red-500">
              No results found. Please adjust your search terms.
            </p>
          )}
        </section>

        <aside className="rounded-lg border border-brand-green/30 bg-white p-6 shadow-md md:p-8">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-brand-dark">
              Installment Transparency
            </h3>
            <p className="text-sm text-gray-600">
              Tuition may be settled across four planned installments. Each
              milestone is confirmed through our accounts office.
            </p>
          </div>
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: "Installment 1",
                description:
                  "Due before term opens (minimum 40% of total fees).",
              },
              {
                title: "Installment 2",
                description:
                  "Mid-term payment covering outstanding tuition and optional services.",
              },
              {
                title: "Installment 3",
                description:
                  "Before next term enrolment confirmation (balance on tuition).",
              },
              {
                title: "Installment 4",
                description:
                  "Final balance deadline following accounts reconciliation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border-l-4 border-brand-green bg-brand-light p-4"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-600">{item.description}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <article className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={termsExpanded}
            onClick={() => setTermsExpanded((prev) => !prev)}
          >
            <span className="text-base font-semibold text-brand-dark">
              Terms &amp; Conditions
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-brand-green">
              <span>{termsExpanded ? "Hide details" : "Expand details"}</span>
              <svg
                aria-hidden="true"
                className={`h-5 w-5 transition-transform duration-300 ${
                  termsExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div
            className={`border-t border-gray-200 px-6 py-6 text-sm text-gray-600 transition-all duration-300 ${
              termsExpanded ? "block" : "hidden"
            }`}
          >
            <ul className="space-y-2 list-disc pl-5">
              <li>Admission fees are non-refundable once placement is confirmed.</li>
              <li>Sibling discounts may apply upon approval by the admissions committee.</li>
              <li>Late payments may incur penalties according to the finance policy.</li>
              <li>Installment deadlines must be respected to avoid learning disruptions.</li>
            </ul>
          </div>
        </article>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <header className="space-y-2">
            <h3 className="text-xl font-semibold text-brand-dark">
              Payment Procedure
            </h3>
            <p className="text-sm text-gray-600">
              Follow these steps to ensure your payment is recognised promptly.
            </p>
          </header>
          <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                step: "1",
                title: "Request Control Number",
                description:
                  "Obtain a control number or reference ID from the admissions or accounts desk.",
              },
              {
                step: "2",
                title: "Complete Payment",
                description:
                  "Pay through approved partner banks or mobile money platforms using the control number.",
              },
              {
                step: "3",
                title: "Keep Receipt",
                description:
                  "Retain the payment slip or confirmation message for reconciliation.",
              },
              {
                step: "4",
                title: "Submit Proof",
                description:
                  "Share proof of payment with the accounts office for timely update of your ward's ledger.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex gap-4 rounded-lg border border-gray-200 bg-brand-light/60 p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
                  {item.step}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-brand-dark">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <a
              href="/downloads/amani-fee-structure.pdf"
              className="inline-flex items-center justify-center rounded-lg bg-brand-green px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
              download
            >
              Download Full Fee Structure (PDF)
            </a>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default FeesSection;
