# Responsible AI contributions 🤝

*An independent community policy informed by the [LLVM AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html). These are Meridian Community's guidelines; they are not LLVM's rules and do not imply LLVM endorsement.*

AI tools are welcome when they genuinely help a person learn, investigate or build. They should never become a way to shift unreviewed work onto maintainers.

## A human must understand the contribution

The person submitting a pull request remains responsible for its content. Review every AI-generated change, know why it exists, inspect its side effects and be prepared to answer reviewer questions. Do not submit a large generated change simply because a model calls it finished.

## Disclose meaningful AI assistance

When substantial parts of code or text were generated with AI, describe what tools assisted, what they produced and what you reviewed. You need not disclose ordinary spelling correction. Include actual test evidence and any unknowns.

Example:

~~~text
AI assistance: An assistant drafted part of the documentation and proposed
a type-level refactor.
Human verification: I read and edited the final text, inspected the diff,
verified the links, and executed the tests listed below.
Limitations: I did not run a browser accessibility audit.
~~~

## Respect maintainer time

Keep contributions focused. Write a clear explanation of the problem, the proposed solution, its consequences, how you tested it and where uncertainty remains. Reading maintainer feedback and thoughtfully responding is part of contributing; pasting every comment into an LLM and returning unreviewed output is not.

## No unauthorized autonomous actions

AI agents may assist locally, but must not merge, publish releases, post community responses, spend money or access sensitive systems without a human-controlled, authorized process. Required reviews and protected branch rules remain in force.

## Protect security, privacy and copyright

Do not submit private keys, user data, internal infrastructure details or third-party material you cannot legally distribute. AI generation does not make copyrighted content free to use. Follow [SECURITY.md](https://github.com/christianhola/-meridian-showcase/blob/main/SECURITY.md) for private reporting of vulnerabilities.

## Help beginners learn

Contributors are welcome to use assistants for explanations and learning. Maintainers may mark specific issues as human-first exercises to protect educational value. LLVM has its own additional rules for beginner issues; we do not claim those rules apply automatically here.

**Explore:** [Full human-first guide](./AI-ASSISTED-DEVELOPMENT.md) · [Agent instructions](./AI-AGENT-WORKFLOW.md) · [Contributing](https://github.com/christianhola/-meridian-showcase/blob/main/CONTRIBUTING.md).

**Official references:** [LLVM AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html) · [GitHub repository security](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository) · [GitHub repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).
