import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Check,
  Download,
  ImagePlus,
  Loader2,
  Moon,
  Sparkles,
  Sun,
  Upload,
  Zap,
} from "lucide-react";
import { removeBackground } from "@imgly/background-removal";

const MarketingSections = lazy(() => import("./MarketingSections"));

type Stage =
  | "idle"
  | "uploading"
  | "analyzing"
  | "removing"
  | "preparing"
  | "done"
  | "error";

const navItems = ["Home", "Features", "Upload", "FAQ", "Contact"];
const statusText: Record<Stage, string> = {
  idle: "Ready for your image",
  uploading: "Uploading image...",
  analyzing: "Analyzing Subject...",
  removing: "Removing Background...",
  preparing: "Preparing HD Result...",
  done: "Transparent PNG ready",
  error: "Something went wrong",
};

// Resolved once per page load: do we have the AI model assets hosted
// locally (via scripts/copy-imgly-assets.mjs), or should we fall back to
// imgly's own CDN? Checking resources.json (a small file) up front avoids
// pointing removeBackground() at a publicPath with nothing in it, which
// would otherwise fail with a confusing "Resource ... not found" error.
let localImglyAssetsPromise: Promise<string | undefined> | null = null;
function getImglyPublicPath(): Promise<string | undefined> {
  if (!localImglyAssetsPromise) {
    const localPath = `${window.location.origin}/imgly/`;
    localImglyAssetsPromise = fetch(`${localPath}resources.json`, {
      method: "HEAD",
    })
      .then((res) => (res.ok ? localPath : undefined))
      .catch(() => undefined);
  }
  return localImglyAssetsPromise;
}

function App() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8FAFF] text-ink selection:bg-electric/15 dark:bg-[#060812] dark:text-white">
      <div className="fixed inset-0 -z-10 opacity-80">
        <div className="absolute left-[-18rem] top-[-16rem] h-[40rem] w-[40rem] rounded-full bg-electric/15 blur-3xl dark:bg-electric/25" />
        <div className="absolute right-[-14rem] top-[18rem] h-[34rem] w-[34rem] rounded-full bg-violet/14 blur-3xl dark:bg-violet/24" />
        <div className="noise" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 transition-all md:px-6 ${
            scrolled
              ? "border border-white/60 bg-white/75 py-3 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-ink/55"
              : "bg-transparent py-2"
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label="ClearCut AI home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink shadow-glow dark:bg-white">
              <Sparkles className="h-5 w-5 text-white dark:text-ink" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              ClearCut<span className="text-electric"> AI</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 rounded-full px-5 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setDark((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-700 backdrop-blur transition hover:scale-105 dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              {dark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <a href="#upload" className="btn-primary hidden sm:inline-flex">
              Upload Image
            </a>
          </div>
        </nav>
      </header>

      <main>
        <Hero />
        <UploadStudio />
        <Suspense fallback={<SectionLoader />}>
          <MarketingSections />
        </Suspense>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen px-5 pt-32 md:px-8 lg:pt-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="badge mb-7">
            <span className="h-2 w-2 rounded-full bg-success" />
            Free · HD transparent PNG · No login required
          </div>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.96] tracking-[-0.055em] md:text-7xl xl:text-[5.8rem]">
            Remove Backgrounds Instantly with AI
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
            Upload any image and get a clean HD transparent background in
            seconds.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#upload" className="btn-primary text-base">
              <Upload className="h-5 w-5" />
              Upload Image
            </a>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {["HD Quality", "Fast Processing", "No Login Required"].map(
              (label) => (
                <div key={label} className="trust-pill">
                  <Check className="h-4 w-4 text-success" />
                  {label}
                </div>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <AnimatedShowcase />
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedShowcase() {
  return (
    <div className="relative mx-auto max-w-xl">
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="premium-panel p-4 sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-electric">
              AI Studio
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Before → Processing → PNG
            </p>
          </div>
          <div className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
            Live
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <MockImageCard label="Before" variant="before" />
          <div className="relative overflow-hidden rounded-[1.8rem] border border-electric/20 bg-ink p-4 text-white shadow-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,255,.4),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(124,58,237,.45),transparent_36%)]" />
            <motion.div
              animate={{ x: ["-35%", "135%"] }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-16 rotate-12 bg-white/20 blur-sm"
            />
            <div className="relative z-10 grid h-56 place-items-center sm:h-72">
              <div className="text-center">
                <Sparkles className="mx-auto h-8 w-8 text-white" />
                <p className="mt-4 text-sm font-bold">AI Processing</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    animate={{ x: ["-100%", "120%"] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full w-2/3 rounded-full bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <MockImageCard label="Transparent PNG" variant="after" />
        </div>
      </motion.div>
      <div className="absolute -bottom-8 left-8 right-8 -z-10 h-24 rounded-full bg-electric/20 blur-3xl" />
    </div>
  );
}

function MockImageCard({
  label,
  variant,
}: {
  label: string;
  variant: "before" | "after";
}) {
  return (
    <div
      className={`relative h-56 overflow-hidden rounded-[1.8rem] border p-4 sm:h-72 ${variant === "after" ? "checker border-slate-200 dark:border-white/10" : "bg-gradient-to-br from-amber/20 via-sky-100 to-violet/20 dark:from-amber/10 dark:via-electric/10 dark:to-violet/20 border-white/80 dark:border-white/10"}`}
    >
      <div className="absolute left-3 top-3 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur dark:bg-ink/70 dark:text-white">
        {label}
      </div>
      <div className="absolute inset-x-5 bottom-5 top-14 rounded-[1.4rem] bg-white/45 shadow-inner dark:bg-white/10" />
      <motion.div
        animate={{ rotate: [0, -1.5, 0], y: [0, -4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 h-40 w-28 -translate-x-1/2 rounded-t-full bg-gradient-to-b from-slate-900 to-slate-700 shadow-2xl"
      >
        <div className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 shadow-xl" />
        <div className="absolute left-1/2 top-2 h-28 w-36 -translate-x-1/2 rounded-[3rem] bg-gradient-to-br from-electric to-violet" />
      </motion.div>
    </div>
  );
}

function UploadStudio() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState("");
  const [slider, setSlider] = useState(52);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setPreview("");
    setResultUrl("");
    setResultBlob(null);
    setFileName("");
    setFileSize("");
    setError("");
    setStage("idle");
  };

  const handleFile = async (file?: File) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please choose a JPG, PNG, or WEBP image.");
      return;
    }
    setError("");
    setFileName(file.name);
    setFileSize(`${(file.size / 1024 / 1024).toFixed(2)} MB`);

    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultBlob(null);

    const previewObjectUrl = URL.createObjectURL(file);
    setPreview(previewObjectUrl);
    setStage("uploading");

    try {
      const localPublicPath = await getImglyPublicPath();
      const blob = await removeBackground(file, {
        // Serve the AI model + ONNX/WASM runtime from our own domain when
        // it's available locally (copied into /public/imgly by
        // scripts/copy-imgly-assets.mjs at install time). If those assets
        // weren't downloaded for some reason, omit publicPath entirely so
        // the library falls back to its own default (imgly's CDN) instead
        // of pointing at an empty local folder, which would otherwise
        // fail with "Resource ... not found".
        ...(localPublicPath ? { publicPath: localPublicPath } : {}),
        output: { format: "image/png", quality: 1 },
        progress: (key: string, current: number, total: number) => {
          // Model download / processing progress updates the stage label.
          if (key.includes("fetch")) {
            setStage("analyzing");
          } else if (key.includes("compute") || key.includes("inference")) {
            const ratio = total ? current / total : 0;
            if (ratio < 0.5) setStage("analyzing");
            else if (ratio < 0.9) setStage("removing");
            else setStage("preparing");
          }
        },
      });
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setStage("done");
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "";
      const isNetworkIssue = /fetch|network|failed to load|NetworkError/i.test(
        message,
      );
      const isMissingResource = /resource .* not found/i.test(message);
      setError(
        isMissingResource
          ? "The AI model assets are missing or incomplete on the server. Re-run `npm install` to re-download them, then rebuild."
          : isNetworkIssue
            ? "Couldn't load the AI model. Check your internet connection (the model only needs to download once) and try again."
            : message
              ? `Background removal failed: ${message}`
              : "Background removal failed. Try a different image.",
      );
      setStage("error");
    }
  };

  const downloadHDPng = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const link = document.createElement("a");
    const base = fileName.replace(/\.[^.]+$/, "") || "clearcut";
    link.download = `${base}-transparent.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  return (
    <section id="upload" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionKicker
          label="AI Upload Studio"
          title="Drag, drop, preview, compare."
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-[.86fr_1.14fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="premium-panel p-4 md:p-6"
          >
            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFile(event.dataTransfer.files[0]);
              }}
              onClick={() => inputRef.current?.click()}
              className="group grid min-h-[380px] cursor-pointer place-items-center rounded-[2rem] border-2 border-dashed border-electric/30 bg-electric/[0.035] p-8 text-center transition hover:border-electric/60 hover:bg-electric/[0.065] dark:bg-electric/10"
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
              <div>
                <motion.div
                  whileHover={{ scale: 1.06, rotate: -3 }}
                  className="mx-auto grid h-20 w-20 place-items-center rounded-[1.6rem] bg-ink text-white shadow-glow dark:bg-white dark:text-ink"
                >
                  <ImagePlus className="h-9 w-9" />
                </motion.div>
                <h3 className="mt-7 text-2xl font-extrabold tracking-tight">
                  Drop your image here
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-slate-500 dark:text-slate-400">
                  Click to upload or drag and drop JPG, PNG, and WEBP files.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {["JPG", "PNG", "WEBP"].map((type) => (
                    <span
                      key={type}
                      className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm dark:bg-white/10 dark:text-slate-300"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoPill label="File" value={fileName || "No image selected"} />
              <InfoPill label="Size" value={fileSize || "Awaiting upload"} />
            </div>
            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08 }}
            className="premium-panel overflow-hidden"
          >
            <div className="border-b border-slate-200/70 p-5 dark:border-white/10 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-electric">
                    Processing
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-tight">
                    {statusText[stage]}
                  </h3>
                </div>
                <StageBadge stage={stage} />
              </div>
            </div>

            <div className="p-5 md:p-6">
              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="checker grid min-h-[410px] place-items-center rounded-[1.8rem] border border-slate-200 dark:border-white/10"
                  >
                    <div className="text-center text-slate-500">
                      <Sparkles className="mx-auto h-9 w-9 text-electric" />
                      <p className="mt-4 font-semibold">
                        Your before/after preview appears here.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {stage !== "done" || !resultUrl ? (
                      <ProcessingPreview preview={preview} stage={stage} />
                    ) : (
                      <Comparison
                        original={preview}
                        result={resultUrl}
                        slider={slider}
                        setSlider={setSlider}
                      />
                    )}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={downloadHDPng}
                        disabled={stage !== "done" || !resultBlob}
                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        <Download className="h-5 w-5" />
                        Download HD PNG
                      </button>
                      <button onClick={reset} className="btn-secondary">
                        Upload Another Image
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessingPreview({
  preview,
  stage,
}: {
  preview: string;
  stage: Stage;
}) {
  const errored = stage === "error";
  return (
    <div className="relative min-h-[410px] overflow-hidden rounded-[1.8rem] bg-ink">
      <img
        src={preview}
        alt="Uploaded preview"
        className="absolute inset-0 h-full w-full object-contain opacity-70 blur-[1px]"
      />
      <div
        className={`absolute inset-0 ${errored ? "bg-gradient-to-br from-red-900/60 via-ink/55 to-red-700/40" : "bg-gradient-to-br from-ink/45 via-electric/20 to-violet/35"}`}
      />
      {!errored && (
        <motion.div
          animate={{ y: ["-15%", "115%"] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 h-20 border-y border-white/50 bg-white/15 shadow-[0_0_60px_rgba(255,255,255,.45)] backdrop-blur-sm"
        />
      )}
      <div className="relative z-10 grid min-h-[410px] place-items-center p-8 text-center text-white">
        <div>
          {errored ? (
            <AlertCircle className="mx-auto h-10 w-10 text-red-200" />
          ) : (
            <Loader2 className="mx-auto h-10 w-10 animate-spin" />
          )}
          <p className="mt-5 text-xl font-extrabold">{statusText[stage]}</p>
          <p className="mt-2 text-sm text-white/60">
            {errored
              ? "Try a smaller image or a different file format."
              : "Running neural segmentation in your browser — first run downloads the model."}
          </p>
        </div>
      </div>
    </div>
  );
}

function Comparison({
  original,
  result,
  slider,
  setSlider,
}: {
  original: string;
  result: string;
  slider: number;
  setSlider: (value: number) => void;
}) {
  return (
    <div className="relative min-h-[410px] overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-100 dark:border-white/10">
      <div className="checker absolute inset-0" />
      <img
        src={original}
        alt="Original uploaded image"
        className="absolute inset-0 h-full w-full object-contain"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${slider}%)` }}
      >
        <div className="checker absolute inset-0" />
        <img
          src={result}
          alt="Background removed result"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${slider}%` }}
      >
        <div className="h-full w-1 -translate-x-1/2 bg-white shadow-[0_0_28px_rgba(10,102,255,.45)]" />
        <div className="absolute left-0 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white font-black text-electric shadow-card">
          VS
        </div>
      </div>
      <input
        aria-label="Before after comparison slider"
        type="range"
        min="2"
        max="98"
        value={slider}
        onChange={(event) => setSlider(Number(event.target.value))}
        className="absolute inset-x-6 bottom-5 z-20 accent-electric"
      />
      <div className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
        Original
      </div>
      <div className="absolute right-5 top-5 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
        Background Removed
      </div>
    </div>
  );
}

function StageBadge({ stage }: { stage: Stage }) {
  if (stage === "error") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500">
        <AlertCircle className="h-4 w-4" />
        Failed
      </div>
    );
  }
  if (stage === "idle") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-2 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
        Idle
      </div>
    );
  }
  const done = stage === "done";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${done ? "bg-success/10 text-success" : "bg-electric/10 text-electric"}`}
    >
      {done ? (
        <Check className="h-4 w-4" />
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {done ? "Ready" : "Working"}
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate font-bold">{value}</p>
    </div>
  );
}

function SectionKicker({ label, title }: { label: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="badge mx-auto mb-4 w-max">
        <Zap className="h-4 w-4 text-electric" />
        {label}
      </div>
      <h2 className="font-display text-4xl font-extrabold tracking-[-0.045em] md:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function SectionLoader() {
  return (
    <div className="grid h-72 place-items-center">
      <Loader2 className="h-7 w-7 animate-spin text-electric" />
    </div>
  );
}

export { SectionKicker };
export default App;
