const sections = [
  {
    title: "1. Using README Forge",
    content: (
      <>
        <p>
          README Forge provides tools for analyzing software repositories and
          generating README documentation. By using the service, you agree to
          use it responsibly and in accordance with these Terms.
        </p>

        <p>
          You must have the necessary rights or authorization to provide any
          repository, files, or other content that you submit to the service.
        </p>
      </>
    ),
  },
  {
    title: "2. Your content",
    content: (
      <>
        <p>
          You retain ownership of the repositories, files, text, and other
          content that you provide to README Forge.
        </p>

        <p>
          By submitting content, you give README Forge the limited permission
          necessary to process that content and provide the requested service.
        </p>
      </>
    ),
  },
  {
    title: "3. Generated content",
    content: (
      <>
        <p>
          README Forge uses automated systems, including AI-powered tools, to
          generate documentation.
        </p>

        <p>
          Generated content may contain mistakes, omissions, or inaccurate
          descriptions of your project. You are responsible for reviewing the
          generated README before publishing it.
        </p>
      </>
    ),
  },
  {
    title: "4. Acceptable use",
    content: (
      <>
        <p>You agree not to use README Forge to:</p>

        <ul>
          <li>Upload content that you do not have permission to use.</li>
          <li>Attempt to compromise or disrupt the service.</li>
          <li>Upload malicious software or harmful content.</li>
          <li>Attempt to access systems or data without authorization.</li>
          <li>Abuse the service in a way that negatively affects other users.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Third-party services",
    content: (
      <p>
        README Forge may depend on third-party services such as GitHub,
        hosting providers, AI providers, analytics services, or other
        infrastructure. Your use of those services may also be subject to
        their own terms and policies.
      </p>
    ),
  },
  {
    title: "6. Availability",
    content: (
      <p>
        We aim to keep README Forge available and reliable, but we do not
        guarantee that the service will always be available, uninterrupted, or
        error-free. Features may be changed, suspended, or discontinued as the
        product evolves.
      </p>
    ),
  },
  {
    title: "7. Disclaimer",
    content: (
      <p>
        README Forge is provided on an “as is” and “as available” basis.
        Generated documentation should be treated as a starting point rather
        than a guaranteed accurate representation of your software.
      </p>
    ),
  },
  {
    title: "8. Limitation of liability",
    content: (
      <p>
        To the extent permitted by applicable law, README Forge and its
        contributors will not be responsible for indirect, incidental,
        special, or consequential damages resulting from your use of the
        service.
      </p>
    ),
  },
  {
    title: "9. Changes to these Terms",
    content: (
      <p>
        We may update these Terms as README Forge changes. Continued use of
        the service after updated Terms are published constitutes acceptance
        of the updated Terms to the extent permitted by applicable law.
      </p>
    ),
  },
];

export default function TermsPage() {
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
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-text-muted">
            Effective date: October 4, 2026
          </p>

          <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary">
            These Terms explain the rules for using README Forge and the
            responsibilities that come with using the service.
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
          These Terms are a general product template and should be reviewed by
          a qualified legal professional before being used as the final legal
          terms for a public service.
        </div>
      </div>
    </main>
  );
}