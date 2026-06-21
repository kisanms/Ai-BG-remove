import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Download,
  Layers3,
  Lock,
  Mail,
  MessageSquare,
  PackageCheck,
  Palette,
  PawPrint,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  UserRound,
  UsersRound,
  WandSparkles,
  Zap,
} from "lucide-react";

const features = [
  [
    "AI Subject Detection",
    "Detects people, products, pets, and objects with a clean subject-first workflow.",
    WandSparkles,
  ],
  [
    "HD Transparent Output",
    "Export crisp PNG assets ready for product pages, ads, and design tools.",
    Download,
  ],
  [
    "Lightning Fast Processing",
    "Purpose-built flow with immediate feedback and status visibility.",
    Zap,
  ],
  [
    "No Login Required",
    "Upload and download without forcing sign-up before value is delivered.",
    UserRound,
  ],
  [
    "Secure Processing",
    "Privacy-forward UI patterns and clear upload lifecycle messaging.",
    ShieldCheck,
  ],
  [
    "Mobile Friendly",
    "Touch-first controls, responsive cards, and ergonomic mobile spacing.",
    Smartphone,
  ],
  [
    "Batch Ready Architecture",
    "Prepared for future queues, credits, teams, and API expansion.",
    Boxes,
  ],
  [
    "High Accuracy Results",
    "Result previews make it simple to validate edges before download.",
    BadgeCheck,
  ],
] as const;

const useCases = [
  [
    "E-Commerce Products",
    "Studio-clean catalog images for marketplaces.",
    ShoppingBag,
  ],
  [
    "Profile Photos",
    "Sharp avatars for resumes, teams, and social profiles.",
    Camera,
  ],
  [
    "Social Media Content",
    "Cutouts that drop into posts, stories, and thumbnails.",
    MessageSquare,
  ],
  [
    "Graphic Design",
    "Transparent assets for posters, decks, and layouts.",
    Palette,
  ],
  [
    "Marketing Materials",
    "Campaign visuals without manual masking.",
    BriefcaseBusiness,
  ],
  [
    "Students & Projects",
    "Presentation-ready images without design software.",
    Layers3,
  ],
] as const;

const faqs = [
  [
    "Is it free?",
    "Yes. The core upload-to-download flow is free and runs entirely in your browser — no sign-up, no usage caps for casual use.",
  ],
  [
    "Do I need an account?",
    "No. The experience works without sign-up, keeping upload-to-download friction low.",
  ],
  [
    "Is HD download available?",
    "Yes. Background removal preserves the input resolution and exports a full-quality transparent PNG.",
  ],
  [
    "How secure are uploads?",
    "Your image never leaves your device — segmentation runs locally in your browser via WebAssembly, so nothing is uploaded to a server.",
  ],
  [
    "What image formats are supported?",
    "The upload flow accepts JPG, PNG, and WEBP images.",
  ],
];

function MarketingSections() {
  return (
    <>
      <Features />
      <HowItWorks />
      <UseCases />
      <Showcase />
      <Stats />
      <Testimonials />
      {/* <Pricing /> */}
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

function Features() {
  return (
    <section id="features" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Product Features"
          title="Everything a premium background remover needs."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, body, Icon], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.035 }}
              whileHover={{ y: -7, scale: 1.015 }}
              className="group rounded-[1.8rem] border border-white/70 bg-white/75 p-6 shadow-card backdrop-blur-xl transition dark:border-white/10 dark:bg-white/[0.055]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-electric/10 text-electric transition group-hover:bg-electric group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-extrabold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    "Upload Image",
    "AI Removes Background",
    "Preview Result",
    "Download HD PNG",
  ];
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How It Works"
          title="Four steps from upload to transparent asset."
        />
        <div className="relative mt-14 grid gap-5 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-electric/35 to-transparent lg:block" />
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative rounded-[1.8rem] border border-white/70 bg-white/75 p-6 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"
            >
              <div className="grid h-20 w-20 place-items-center rounded-[1.5rem] bg-ink text-2xl font-extrabold text-white shadow-glow dark:bg-white dark:text-ink">
                {index + 1}
              </div>
              <h3 className="mt-7 text-xl font-extrabold tracking-tight">
                {step}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {index === 0 &&
                  "Drag and drop a supported image into the studio."}
                {index === 1 &&
                  "The interface shows scan, mask, and cleanup progress."}
                {index === 2 &&
                  "Use the before/after slider to validate the result."}
                {index === 3 && "Export a transparent PNG for your workflow."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Use Cases"
          title="Designed for everyday image workflows."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, body, Icon], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.045 }}
              className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-electric/15 via-white to-violet/15 dark:via-white/5">
                <div className="absolute inset-5 rounded-[1.5rem] border border-white/70 bg-white/45 dark:border-white/10 dark:bg-white/5" />
                <motion.div
                  whileHover={{ rotate: -4, scale: 1.06 }}
                  className="absolute left-8 top-8 grid h-24 w-24 place-items-center rounded-[2rem] bg-ink text-white shadow-glow dark:bg-white dark:text-ink"
                >
                  <Icon className="h-10 w-10" />
                </motion.div>
                <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full bg-electric/20 blur-2xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const examples = [
    ["Portrait", UserRound],
    ["Product", PackageCheck],
    ["Vehicle", Rocket],
    ["Pet", PawPrint],
    ["Nature", Sparkles],
  ] as const;
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState(50);

  return (
    <section id="showcase" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Before / After Showcase"
          title="Interactive examples for every category."
        />
        <div className="mt-12 grid gap-7 lg:grid-cols-[.34fr_.66fr]">
          <div className="space-y-3">
            {examples.map(([label, Icon], index) => (
              <button
                key={label}
                onClick={() => setActive(index)}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                  active === index
                    ? "border-electric bg-electric text-white shadow-glow"
                    : "border-white/70 bg-white/75 hover:border-electric/50 dark:border-white/10 dark:bg-white/[0.055]"
                }`}
              >
                <span className="flex items-center gap-3 font-extrabold">
                  <Icon className="h-5 w-5" />
                  {label}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ))}
          </div>
          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/20 via-sky-100 to-violet/20 dark:from-amber/10 dark:via-electric/10 dark:to-violet/20" />
            <Illustration category={examples[active][0]} />
            <div
              className="checker absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${position}%)` }}
            >
              <Illustration category={examples[active][0]} clean />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0"
              style={{ left: `${position}%` }}
            >
              <div className="h-full w-1 -translate-x-1/2 bg-white" />
              <span className="absolute left-0 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-black text-electric shadow-card">
                SLIDE
              </span>
            </div>
            <input
              aria-label="Showcase comparison slider"
              type="range"
              min="12"
              max="88"
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              className="absolute inset-x-8 bottom-8 z-10 accent-electric"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Illustration({
  category,
  clean = false,
}: {
  category: string;
  clean?: boolean;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center p-10">
      <motion.div
        key={`${category}-${clean}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative h-72 w-72 rounded-[3rem] ${clean ? "bg-transparent" : "bg-white/45 dark:bg-white/10"}`}
      >
        <div className="absolute inset-x-10 bottom-12 h-36 rounded-[2rem] bg-gradient-to-br from-electric to-violet shadow-glow" />
        <div className="absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 shadow-xl" />
        <div className="absolute left-1/2 top-36 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-extrabold text-ink shadow-card">
          {category}
        </div>
      </motion.div>
    </div>
  );
}

function Stats() {
  const stats = [
    ["12M+", "Images Processed"],
    ["3.8s", "Processing Speed"],
    ["98%", "User Satisfaction"],
    ["8M+", "Downloads Generated"],
  ];
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.2rem] bg-ink p-6 text-white shadow-glow md:p-10">
        <div className="grid gap-5 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-6 text-center"
            >
              <p className="text-4xl font-extrabold tracking-[-0.04em] md:text-5xl">
                {value}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/55">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    [
      "ClearCut gets the workflow right: upload, preview, download. No friction.",
      "Maya, Marketplace Founder",
    ],
    [
      "The before-after comparison makes QA simple for product photography.",
      "Jon, Creative Lead",
    ],
    [
      "Feels premium without making users create an account before trying it.",
      "Priya, Growth Marketer",
    ],
  ];
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Testimonials"
          title="Built around trust and speed."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(([quote, author], index) => (
            <motion.figure
              key={author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/70 bg-white/65 p-7 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"
            >
              <div className="flex gap-1 text-amber">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <blockquote className="mt-6 text-lg font-bold leading-8 tracking-tight">
                “{quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {author}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// function Pricing() {
//   const plans = [
//     ["Free", "$0", "For one-off image edits", ["No login required", "Standard preview", "Single image export"]],
//     ["Pro", "$12", "For creators and teams", ["HD PNG downloads", "Priority processing", "Batch-ready workspace"]],
//     ["Business", "Custom", "For production teams", ["API access", "Team controls", "Security review"]]
//   ];
//   return (
//     <section id="pricing" className="px-5 py-24 md:px-8">
//       <div className="mx-auto max-w-7xl">
//         <SectionHeader eyebrow="Pricing" title="Simple plans for a future production launch." />
//         <div className="mt-12 grid gap-5 lg:grid-cols-3">
//           {plans.map(([name, price, desc, items], index) => (
//             <motion.div
//               key={name as string}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.07 }}
//               className={`relative rounded-[2rem] border p-7 shadow-card ${
//                 index === 1
//                   ? "border-electric bg-ink text-white"
//                   : "border-white/70 bg-white/75 dark:border-white/10 dark:bg-white/[0.055]"
//               }`}
//             >
//               {index === 1 && <span className="absolute right-6 top-6 rounded-full bg-electric px-3 py-1 text-xs font-extrabold">Most Popular</span>}
//               <h3 className="text-2xl font-extrabold">{name}</h3>
//               <p className={`mt-2 text-sm ${index === 1 ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`}>{desc}</p>
//               <p className="mt-7 text-5xl font-extrabold tracking-[-0.05em]">{price}</p>
//               <ul className="mt-7 space-y-3">
//                 {(items as string[]).map((item) => (
//                   <li key={item} className="flex items-center gap-3 text-sm font-semibold">
//                     <Check className="h-4 w-4 text-success" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//               <a href="#upload" className={index === 1 ? "btn-light mt-8 w-full" : "btn-secondary mt-8 w-full"}>
//                 Start with Upload
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="Answers before users upload." />
        <div className="mt-10 space-y-3">
          {faqs.map(([question, answer], index) => (
            <div
              key={question}
              className="overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"
            >
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between p-5 text-left font-extrabold"
              >
                {question}
                <ChevronDown
                  className={`h-5 w-5 transition ${open === index ? "rotate-180" : ""}`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: open === index ? "auto" : 0,
                  opacity: open === index ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 leading-7 text-slate-500 dark:text-slate-400">
                  {answer}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    if (!email.includes("@") || message.length < 8) {
      setError("Enter a valid email and a message with at least 8 characters.");
      return;
    }
    setError("");
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-7 rounded-[2.2rem] border border-white/70 bg-white/75 p-6 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] md:p-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <div className="badge mb-5 w-max">
            <Mail className="h-4 w-4 text-electric" />
            Contact
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.045em] md:text-6xl">
            Want this with your own backend?
          </h2>
          <p className="mt-5 max-w-lg leading-8 text-slate-500 dark:text-slate-400">
            Connect ClearCut to your storage, billing, or batch pipeline. Reach
            out and we&apos;ll help you scale it.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input name="name" placeholder="Name" className="form-field" />
          <input name="email" placeholder="Email" className="form-field" />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            className="form-field resize-none"
          />
          {error && (
            <p className="text-sm font-semibold text-red-500">{error}</p>
          )}
          {sent && (
            <p className="text-sm font-semibold text-success">
              Thanks — your message has been received.
            </p>
          )}
          <button className="btn-primary w-full">Send Message</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-5 pb-10 pt-16 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink p-8 text-white md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-ink">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-extrabold">
                ClearCut AI
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
              A modern AI background remover built for speed, privacy, and
              conversion. All processing happens in your browser.
            </p>
          </div>
          {[
            ["Product", ["Features", "Demo", ""]],
            ["Resources", ["FAQ", "Contact", "API"]],
            ["Legal", ["Privacy Policy", "Terms", "Security"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <h4 className="font-extrabold">{title}</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/55">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a
                      className="transition hover:text-white"
                      href={`#${link.toLowerCase().split(" ")[0]}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ClearCut AI. All rights reserved.</p>
          <div className="flex gap-3">
            {["X", "in", "Dr"].map((social) => (
              <span
                key={social}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 font-bold"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="badge mx-auto mb-4 w-max">
        <Sparkles className="h-4 w-4 text-electric" />
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl font-extrabold tracking-[-0.045em] md:text-6xl">
        {title}
      </h2>
    </motion.div>
  );
}

export default MarketingSections;
