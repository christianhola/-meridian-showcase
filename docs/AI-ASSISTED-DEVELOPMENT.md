# A human guide to building software with AI 🏗️

*Pseudocode, bytecode, safe worktrees, compiler feedback, responsible open source, and the lessons that only real projects teach you.*

> AI can help us build faster. It cannot replace understanding the code, protecting the people who use it, or checking whether our changes actually work.

This guide is for developers, students, community contributors, maintainers, and anyone who wants to understand what an AI coding assistant did. You do not need to be an expert to start. You do need curiosity, a little patience, and a willingness to verify things.

[Copy the agent workflow](./AI-AGENT-WORKFLOW.md) · [Read the community AI contribution policy](./AI-CONTRIBUTION-POLICY.md) · [Contribute](https://github.com/christianhola/-meridian-showcase/blob/main/CONTRIBUTING.md)

## A personal note from Christian 💬

I love what AI makes possible for software builders. An idea can become a prototype much faster than before. But I've learned that a fast answer is not necessarily a correct answer. My goal with this community is to share how to turn that first draft into work that people can actually trust.

Supabase is one of the platforms I genuinely enjoy working with. I love the experience of bringing PostgreSQL, authentication, storage, and backend development into a more connected workflow. Its open-source community is inspiring, too. My biggest takeaway is that using a powerful backend should push you to learn more about permissions and good database design, not less. The platform provides capabilities; we remain responsible for configuring them correctly.

I also really like the experience of building with Vercel. The previews made development feel immediate. But I didn't initially understand the credit and usage model well enough, and I spent much more than I meant to. That was a difficult lesson. It was also useful: I started paying more attention to budgets, usage, repeated builds, and what happens when automated tools keep trying again. I don't want to turn my personal experience into a claim about everyone's bills. I want other builders to read the pricing and understand their own limits before running expensive experiments.

If this community succeeds, it won't be because we published the most code. It will be because someone else can follow an explanation, make a small change, and truly understand what they built.

*— Christian, Meridian Community*

## The whole process at a glance

~~~mermaid
flowchart LR
    A["Understand the request"] --> B["Read code and AST"]
    B --> C["Describe logic in pseudocode"]
    C --> D["Implement in an isolated workspace"]
    D --> E["Compile and test"]
    E --> F{"Checks pass?"}
    F -- No --> G["Diagnose and correct"]
    G --> E
    F -- Yes --> H["Human review"]
    H --> I["Authorized merge"]
    I --> J["Clear final report"]
~~~

This is a **recommended workflow**, not an assertion that this community website already runs autonomous agents or creates secure containers.

### The ecosystem behind the concepts

| Platform | What a developer can learn from it | Verified resource |
| --- | --- | --- |
| <img src="https://cdn.simpleicons.org/github/808080" width="22" alt="GitHub logo"> **GitHub** | Branches, diffs, human reviews and community governance | [GitHub Docs](https://docs.github.com/) |
| <img src="https://cdn.simpleicons.org/typescript/3178C6" width="22" alt="TypeScript logo"> **TypeScript** | Types, compiler feedback and structural contracts | [TSConfig reference](https://www.typescriptlang.org/tsconfig/) |
| <img src="https://cdn.simpleicons.org/supabase/3ECF8E" width="22" alt="Supabase logo"> **Supabase** | PostgreSQL, authentication, RLS and open-source collaboration | [Open Source](https://supabase.com/open-source) |
| <img src="https://cdn.simpleicons.org/vercel/808080" width="22" alt="Vercel logo"> **Vercel** | Previews, deployment workflows, usage and billing limits | [Pricing documentation](https://vercel.com/docs/pricing) |

The icons identify third-party products; they do not imply a sponsorship, partnership, or endorsement. If an external image cannot load, the text and official links remain available.

### A conceptual map, not a hidden implementation

~~~mermaid
flowchart TD
    IDEA["💡 Idea"] --> PSEUDO["🧠 Pseudocode"]
    PSEUDO --> GIT["GitHub: worktree or branch"]
    GIT --> CODE["Small code change"]
    CODE --> TS["TypeScript and tests"]
    CODE -. "optional backend" .-> SB["Supabase: database and RLS"]
    TS --> REVIEW["Review the evidence"]
    SB --> REVIEW
    REVIEW --> HUMAN{"Human approves?"}
    HUMAN -- No --> GIT
    HUMAN -- Yes --> VC["Vercel or another preview host"]
    VC --> COST["Check usage and costs"]
    COST --> RELEASE["Authorized release"]
~~~

The dotted Supabase path represents an optional example architecture. This repository is a community portal using React, Vite and TypeScript; the diagram does **not** promise a live Supabase backend or Vercel deployment.

## Context and AST: understand the project before changing it

An abstract syntax tree (AST) is a structural representation of parsed source code. It can help tools identify declarations, expressions, imports and relationships. It does not by itself establish that a program is secure or behaves correctly at runtime.

Before sending a prompt, inspect the actual repository layout, existing components, tests, dependency manifest, TypeScript configuration, schema and permission boundaries. If a file or database table is unknown, don't invent it.

“Create a chat” leaves almost every decision unexplained. A better instruction is:

~~~text
Inspect the existing message interface and its related tests.
Identify the real files, dependencies, types, and styling conventions.
Explain a small, reusable improvement in pseudocode before writing code.
Preserve the current UI and do not assume there is a table named messages.
Do not add packages, modify production, or use paid APIs without approval.
~~~

That request makes the assistant examine reality instead of filling gaps with plausible-sounding code.

## Direct prompting: give an engineer a useful brief

A good brief contains the actual problem, the intended user, the files or modules that are in scope, the behavior that must remain unchanged, the security boundaries and the definition of success. Make big jobs smaller. A message composer, persisted drafts, and an MCP suggestion card can be separate tasks with their own tests.

The first output from an agent should often be a short plan and **plain-language pseudocode**. This lets someone correct the idea before it becomes a complicated patch.

## Sandboxing and worktrees: isolate changes honestly 🛡️

For high-impact changes, use a dedicated branch or worktree. A Git worktree creates a separate checkout of a repository; it is **not automatically a security sandbox**. Running untrusted code safely may require further restrictions on credentials, network access, filesystem access and privileges.

For example, after checking the current repository state, you might run:

~~~bash
git status --short --branch
git worktree list
git worktree add -b docs/agent-guide ../agent-guide main
~~~

Here, the new worktree uses its *own* new branch. Do not blindly create a worktree against a branch already checked out elsewhere. Always verify the intended branch and clean up deliberately. [Git's official worktree reference](https://git-scm.com/docs/git-worktree) explains the underlying behavior.

Never copy production data, private user information or real service-role keys into a testing environment. A worktree protects the original checkout from many accidental edits; it does not protect a production database from commands that still have production credentials.

## Compiler feedback: an honest loop, not a magic guarantee

After a change, run the checks your repository actually provides. In a TypeScript project, that may mean a compiler/typecheck, a linter, unit tests, integration tests and a build. Diagnose an error from its exact text, make a targeted correction and rerun the relevant check.

~~~text
Read the compiler error exactly as printed.
Locate the real declaration and call sites.
Identify whether the problem is in the code or the declared types.
Change the smallest correct unit.
Run the check again.
Report the actual result and any remaining warnings.
~~~

A passing typecheck does not prove that a browser flow works, that security rules are correct, or that an external integration is live. If a test could not run, record that limitation. “Zero errors” is a target to verify, not something to promise in advance.

## Refactoring and human review

Before merging, inspect the final diff and validate package names against the dependency manifest. Check imports, API contracts, data migrations, accessibility, license compatibility and permission changes. For complicated structural changes, AST-aware tooling can help, but human review remains essential.

An autonomous agent should never merge, publish, deploy production, contact third parties or spend money solely because its own checks look green. Those decisions belong to an authorized person and the repository's review rules.

This principle also appears in [LLVM's AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html): human authors must review and understand generated contributions, disclose substantial AI assistance, and respect maintainers' review time. LLVM's exact rules are specific to LLVM. Our [community adaptation](./AI-CONTRIBUTION-POLICY.md) is independent.

## What pseudocode is, and why people should use it 📖

Pseudocode is an explanation of program logic in ordinary, structured language. It makes decisions, loops, permissions and failure cases understandable without forcing the reader to learn every detail of a programming language.

Here is a conceptual example of saving a message:

~~~text
WHEN someone submits a message
    VERIFY the person is signed in
    CHECK that the person can access this workspace
    CHECK the message is valid

    IF any check fails
        EXPLAIN the problem and keep the unsent draft
        STOP
    END IF

    ASK the authorized backend to save the message

    IF the backend confirms success
        DISPLAY the saved message
    OTHERWISE
        EXPLAIN the error and allow a safe retry
    END IF
END
~~~

This describes the intention. **It does not implement access control.** A real backend must independently enforce authorization, and a database service such as Supabase may require careful Row Level Security policies and grants. See [Supabase's official RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security).

### Ask an AI for pseudocode step by step

Tell it to read the actual code first. Ask it to identify known inputs, data flows, decision points, permissions, errors and expected outcomes. Ask for a natural explanation before requesting an implementation. Finally, have it map the pseudocode to verified files and tests.

A useful copy-ready request:

~~~text
Explain the change as readable, language-neutral pseudocode first.
Use WHEN, IF, OTHERWISE and END only when they improve clarity.
Show input validation, authorization, error cases and success behavior.
Do not invent paths or dependencies.
Then implement the approved scope in an isolated workspace.
Report the exact tests you executed and the limitations you found.
Use [LISTO] only if the requested work is genuinely finished.
~~~

## Bytecode is different from pseudocode

Bytecode is an executable intermediate representation with instructions defined by a specific virtual machine. The JVM, Python interpreter and Ethereum Virtual Machine differ; none should be interpreted through guessed semantics.

To analyze bytecode, identify the VM and version, read opcodes sequentially, track the operand stack and local variables, follow conditional branches and join points, and mark unknown values explicitly. Only then translate observed behavior into pseudocode.

Consider this tiny **JVM-style illustrative fragment**:

~~~text
ILOAD 1
ICONST_2
IMUL
ISTORE 2
~~~

It loads an integer from local slot one, pushes the number two, multiplies the values and stores the product into local slot two. A faithful explanation is:

~~~text
READ an integer from local slot one
MULTIPLY it by two
STORE the result in local slot two
~~~

Those instructions do **not** include a return. Therefore a pseudocode example claiming that the fragment returns a value would invent behavior. A verified decompilation must distinguish recovered facts from reconstructed names or assumptions. Read the [official JVM instruction set](https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-6.html) when working with JVM opcodes.

## A useful final report in natural language

A good final report is short enough for a person to read, specific enough to check, and honest about unfinished work.

~~~text
[LISTO]

The form now checks the submitted information and preserves the draft when
something is missing. I reused the existing component and added no packages.

The project's typecheck and the focused tests ran successfully in the isolated
workspace. I have not merged the branch or deployed the project; those steps
still require approval.

In plain language:
When the person submits, check the required fields.
If they are valid, send the information to the authorized service.
If they are invalid, explain what needs fixing without erasing the draft.
~~~

**This is an example report, not evidence that these tests ran here.** If the agent cannot finish, it should use `[PENDING]` or `[BLOCKED]`, say what failed and avoid `[LISTO]`.

## The open-source and infrastructure lessons that stay with me 🌱

Supabase's [open-source community page](https://supabase.com/open-source) points to a culture of sharing tools and collaborating on the software developers depend on. The bigger lesson is accountability: understandable schemas, correct access permissions, documented migrations and realistic tests.

Vercel's [pricing documentation](https://vercel.com/docs/pricing) explains that infrastructure consumption can be metered by resources such as requests, compute duration and data transfer. Its [Pro plan documentation](https://vercel.com/docs/plans/pro-plan) describes monthly credits and on-demand usage, while [Spend Management](https://vercel.com/docs/spend-management) clarifies that setting a spending threshold does not automatically stop usage unless the relevant pause action is enabled. Plan features and pricing can change. Always check your own current account configuration.

Those platform details come from official sources. The first-person observations at the top of this guide reflect my experience, not a public audit of my accounts or a statement about other customers.

## Source notes and further reading 🔎

This guide is grounded in the two Spanish drafts shared for this community, **Guía de Implementación: Inteligencia Artificial en el Desarrollo de Software** and **Guía de IA: Optimización de Bytecode, Pseudocódigo y Comunicación Humana**. Their educational examples were refined to avoid claiming that hypothetical failures are externally documented incidents, that a worktree is a secure sandbox, or that compiler success proves an application is flawless.

The following original sources support the technical and governance material:

- [LLVM — AI Tool Use Policy](https://llvm.org/docs/AIToolPolicy.html), for human responsibility, disclosure and review quality.
- [Git — git-worktree](https://git-scm.com/docs/git-worktree), for independent working trees.
- [GitHub — Mermaid diagrams](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams), for Markdown diagram support.
- [GitHub — repository security](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository), for security controls.
- [TypeScript — TSConfig reference](https://www.typescriptlang.org/tsconfig/), for compiler options.
- [Supabase — Open Source](https://supabase.com/open-source), for its open-source ecosystem.
- [Supabase — Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), for granular data authorization.
- [Vercel — Pricing](https://vercel.com/docs/pricing), for metered usage.
- [Vercel — Spend Management](https://vercel.com/docs/spend-management), for billing thresholds and actions.
- [Oracle — JVM Specification, Chapter 6](https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-6.html), for JVM bytecode semantics.

---

## Keep building, and bring somebody with you 🚀

Have a question or a better example? Make a small contribution, share the evidence, and help someone else learn. That's the kind of technical community worth building.

**Meridian Community × Christian** · [Explore our repository](https://github.com/christianhola/-meridian-showcase) · [Join the contribution process](https://github.com/christianhola/-meridian-showcase/blob/main/CONTRIBUTING.md)

*Independent community publication. GitHub, LLVM, TypeScript, Supabase and Vercel do not sponsor or endorse this guide.*
