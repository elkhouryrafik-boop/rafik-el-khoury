import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32 lg:px-14"
    >
      <SectionLabel number="02">About</SectionLabel>

      <div className="mt-12 grid grid-cols-12 gap-6">
        <h2
          className="col-span-12 md:col-span-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h1)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Four disciplines, one job.
        </h2>

        <div
          className="col-span-12 md:col-span-6 md:col-start-7 space-y-5"
          style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--ink-2)" }}
        >
          <p>
            The family business — <em>Rafik El-Khoury &amp; Partners</em>,
            founded in <strong>1967</strong> — is a multidisciplinary
            consulting engineering practice with offices in{" "}
            <strong>Beirut</strong>, <strong>Abu Dhabi</strong>,{" "}
            <strong>Dubai</strong>, and <strong>Riyadh</strong>, and project
            work across Iraq and Africa. I grew up inside that story, so I
            went to <strong>Loughborough</strong> to study civil engineering.
          </p>
          <p>
            In my final year my dissertation on{" "}
            <strong>Natural Flood Management</strong> changed everything. It
            was the first time I saw the ecosystem as one connected system —
            where rivers, soils, vegetation, and human settlement are
            interlocking variables, and working <em>with</em> those connections
            produces better outcomes than working against them.
          </p>
          <p>
            I chased that thread. I took a{" "}
            <strong>Permaculture Design Course</strong>, volunteered on farms
            in Greece, and interned with an agricultural company — learning
            soil, plant taxonomy, and fungi from people who treat the ground as
            a living instrument rather than a substrate to pour concrete onto.
          </p>
          <p>
            That pulled me toward <strong>urbanism</strong>. At the{" "}
            <strong>University of Dundee</strong> I worked through a
            research-by-design masterplan on the city&apos;s urban-rural fringe
            — biophilic principles, master-planning fundamentals. I was honest
            with myself: the ideas were there, but the production tooling was
            slow.
          </p>
          <p>
            I went to <strong>Abu Dhabi</strong> to work with the family
            business — shadowing the urban designer on masterplans across the
            emirate, park briefs, villa redesigns, and a 19 km² island
            evaluation. Then back to <strong>Lebanon</strong>, where I
            contributed to concept design for roughly{" "}
            <strong>25 war-damaged schools</strong>, each rebuilt to its
            specific damage profile. The gap was unmistakable: the discipline
            needed faster, more data-driven tools.
          </p>
          <p>
            In <strong>September 2025</strong> I began a master&apos;s in{" "}
            <strong>AI for Architecture and the Built Environment</strong> at{" "}
            <em>IAAC</em>, Barcelona.
          </p>
          <p>
            I learned to code with AI as my pair — Claude Code, prompt
            engineering, the craft of giving context cleanly. In parallel I
            worked through <strong>computer vision</strong>,{" "}
            <strong>neural networks</strong>, and classical ML — so I could
            pick the right tool rather than the trendy one.
          </p>
          <p>
            It paid off in the work. In every university project{" "}
            <strong>I was the one in charge of the code</strong>, and that
            responsibility is what made me good at it. I orchestrate{" "}
            <strong>200+ agents and 150+ skills</strong> strategically, and I
            deliberately take my time when I build — staying in control of
            every architectural decision and understanding the intricate
            details of the system rather than accepting whatever compiles. My
            end-of-course review put it plainly:{" "}
            <em>high technical skill</em>. The{" "}
            <strong>Infrared.city Buildathon</strong> said it too —{" "}
            <strong>3rd place, solo</strong>, with every cooling number
            measured on live simulation.
          </p>
          <p>
            <strong>This is where it all coheres.</strong> I have the{" "}
            <strong>mind of an engineer</strong>, the{" "}
            <strong>heart of a planner</strong>, and the{" "}
            <strong>technical skills of a programmer</strong>. I am not
            specialised into a single role — I can understand the whole chain,
            and when I don&apos;t know something, I learn it and do it.
          </p>
          <p>
            If you decide to work with me, you will realise I am addicted to
            challenging myself and doing hard things — simply because I enjoy
            it. That determination doesn&apos;t switch off between projects:
            I am <strong>already designing software for the family
            practice</strong>. Solving urban problems is an honour for me: I
            deeply appreciate the power of planning and urban design to
            improve life in the city, and to push for{" "}
            <strong>ecological regeneration</strong>, which is dear to my
            heart.
          </p>
          <p>
            The thesis is short.{" "}
            <em>Yesterday humans built tools for humans. Today computers
            build tools for humans. Tomorrow humans will build tools for
            computers.</em>{" "}
            <strong>AI is not a tool — it is the medium between you and what
            you want to create.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
