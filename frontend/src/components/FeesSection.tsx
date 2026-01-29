import { Fragment, useMemo, useState, type FC, type ChangeEvent } from "react";
import { Container } from "@/components/Container";
import { Skeleton } from "@/components/Skeleton";
import { useFees } from "@/hooks";
import type { FeeItem } from "@/types/api";

type FeeRow = {
  id: string;
  category: string;
  grade: string;
  tuitionFee: string;
  administrationFee: string;
  optionalCosts: string[];
  totalPerTerm: string;
  searchTerms: string;
};

const currencyFormatter = new Intl.NumberFormat("en-TZ", {
  style: "currency",
  currency: "TZS",
  maximumFractionDigits: 0,
});

const formatCurrency = (amount: number): string => {
  return currencyFormatter.format(Math.round(amount));
};

const buildRows = (items: FeeItem[]): FeeRow[] => {
  return items.map((item) => {
    const optionalCosts = item.optionalCosts.map((cost) => `${cost.label}: ${formatCurrency(cost.amount)}`);
    const searchTerms = [item.category, item.grade, ...item.optionalCosts.map((cost) => cost.label)].join(" ").toLowerCase();

    return {
      id: item.id,
      category: item.category,
      grade: item.grade,
      tuitionFee: formatCurrency(item.tuitionFee),
      administrationFee: formatCurrency(item.administrationFee),
      optionalCosts,
      totalPerTerm: formatCurrency(item.totalPerTerm),
      searchTerms,
    };
  });
};

export const FeesSection: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [termsExpanded, setTermsExpanded] = useState<boolean>(false);

  const { data, isLoading } = useFees();

  const feeItems = data?.items ?? [];
  const feeCategories = data?.categories ?? [];

  const normalizedRows = useMemo(() => buildRows(feeItems), [feeItems]);

  const filteredRows = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return normalizedRows;
    }

    return normalizedRows.filter((row) => row.searchTerms.includes(normalized));
  }, [normalizedRows, searchTerm]);

  const categoryOrder = useMemo(() => {
    if (feeCategories.length > 0) {
      return feeCategories;
    }

    return Array.from(new Set(normalizedRows.map((row) => row.category)));
  }, [feeCategories, normalizedRows]);

  const groupedRows = useMemo(() => {
    return categoryOrder
      .map((category) => ({
        category,
        rows: filteredRows.filter((row) => row.category === category),
      }))
      .filter((group) => group.rows.length > 0);
  }, [categoryOrder, filteredRows]);

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
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <tr key={`fees-skeleton-${index}`} className="bg-white">
                        <td colSpan={5} className="px-6 py-4">
                          <Skeleton className="h-4 w-full rounded" />
                        </td>
                      </tr>
                    ))
                  : groupedRows.length > 0
                  ? groupedRows.map((group) => (
                      <Fragment key={`group-${group.category}`}>
                        <tr className="bg-brand-light/60 text-xs font-semibold uppercase tracking-wide text-brand-brown">
                          <td colSpan={5} className="px-6 py-3">
                            {group.category}
                          </td>
                        </tr>
                        {group.rows.map((row) => (
                          <tr
                            key={row.id}
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
                                  <div key={`${row.id}-${cost}`}>{cost}</div>
                                ))}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-brand-dark">
                              {row.totalPerTerm}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))
                  : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                          No results found. Please adjust your search terms.
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
          </div>
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
