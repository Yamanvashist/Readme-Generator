const sections = [
  {
    title: "1. Information we collect",
    content: (
      <>
        <p>
          README Forge is designed to generate documentation from your
          repository. Depending on how you use the service, we may collect:
        </p>

        <ul>
          <li>GitHub repository URLs that you provide.</li>
          <li>
            Repository or project files that you upload for README generation.
          </li>
          <li>
            Additional project information that you voluntarily provide.
          </li>
          <li>
            Basic technical information required to operate and secure the
            service.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. How we use your information",
    content: (
      <>
        <p>We use the information we collect to:</p>

        <ul>
          <li>Analyze repositories and generate README documentation.</li>
          <li>Provide, maintain, and improve README Forge.</li>
          <li>Prevent abuse and protect the service.</li>
          <li>Respond to support requests and technical issues.</li>
        </ul>

        <p>
          We do not use your repository content for unrelated purposes unless
          we clearly inform you otherwise.
        </p>
      </>
    ),
  },
  {
    title: "3. Repository data",
    content: (
      <>
        <p>
          When you provide a public GitHub repository, README Forge may access
          the repository information necessary to analyze the project and
          generate documentation.
        </p>

        <p>
          If you upload project files directly, those files may be temporarily
          processed by our service to generate your README.
        </p>

        <p>
          You should not upload passwords, API keys, private credentials, or
          other sensitive information to README Forge.
        </p>
      </>
    ),
  },
  {
    title: "4. Third-party services",
    content: (
      <p>
        README Forge may use third-party infrastructure and AI services to
        process repository information and generate documentation. These
        services may process information on our behalf in accordance with
        their applicable terms and privacy policies.
      </p>
    ),
  },
  {
    title: "5. Data retention",
    content: (
      <p>
        We retain information only for as long as reasonably necessary to
        provide the service, maintain security, comply with legal obligations,
        or resolve disputes. Retention periods may vary depending on the type
        of information and how the service is used.
      </p>
    ),
  },
  {
    title: "6. Security",
    content: (
      <p>
        We take reasonable technical and organizational measures to protect
        information handled by README Forge. However, no internet service can
        guarantee absolute security.
      </p>
    ),
  },
  {
    title: "7. Your choices",
    content: (
      <p>
        You can choose what repository information or project details you
        provide to README Forge. If you have questions about your data or want
        to request its deletion, contact us using the support contact provided
        by the project.
      </p>
    ),
  },
  {
    title: "8. Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy as README Forge evolves. When we
        make changes, we will update the effective date shown on this page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="border-b border-border pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
            Legal
          </p>

          <h1
            className="
              mt-4 text-4xl font-semibold
              tracking-[-0.04em]
              text-text-primary
              sm:text-5xl
            "
          >
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-text-muted">
            Effective date: October 4, 2026
          </p>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary">
            This Privacy Policy explains how README Forge collects, uses, and
            protects information when you use our service.
          </p>
        </div>

        <div className="divide-y divide-border">
          {sections.map((section) => (
            <section key={section.title} className="py-8">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-text-primary">
                {section.title}
              </h2>

              <div
                className="
                  mt-4 space-y-4
                  text-sm leading-7
                  text-text-secondary
                  [&_ul]:space-y-2
                  [&_ul]:pl-5
                  [&_li]:list-disc
                "
              >
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-white p-5 text-sm leading-6 text-text-secondary">
          <strong className="font-medium text-text-primary">
            Important:
          </strong>{" "}
          This is a general privacy-policy template for README Forge and should
          be reviewed and adapted to the actual data flows, providers, and
          legal requirements of your deployed application.
        </div>
      </div>
    </main>
  );
}