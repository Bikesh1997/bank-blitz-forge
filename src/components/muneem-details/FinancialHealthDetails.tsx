"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Check,
  CreditCard,
  FileText,
  Loader2,
  TrendingUp,
  Activity,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  Download,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Zap,
  Star,
  TrendingDown,
  Shield,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

/**
 * IMPLEMENTS
 * 1) AI-powered dynamic analysis mock (cash flow, revenue, expenses, benchmarking)
 * 2) Predictive cash flow for 30/60/90 days with shortfall detection + suggestions
 * 3) Risk alerts (declining sales, expense spikes, low runway, etc.)
 * 4) Pre-approved offers (worded as "credit options" to avoid loan terminology)
 * 5) Stepper UX: large dots, connecting lines, checkmarks when completed; no labels
 * 6) No GST field (per user request)
 */

const docSteps = [
  { id: "cibil", icon: CreditCard },
  { id: "itr", icon: FileText },
  { id: "bankStatement", icon: Building },
] as const;

type DocStepId = (typeof docSteps)[number]["id"];

type Analysis = {
  kpis: {
    cashFlowStatus: "Healthy" | "Tight" | "Critical";
    revenueGrowthPct: number; // MoM
    expenseOptimizationNote: string;
    benchmarkPercentile: number; // 0-100
  };
  forecast: Array<{ day: number; date: string; projectedCash: number }>;
  threshold: number; // min comfortable cash
  shortfalls: Array<{ from: number; to: number; minCash: number }>; // day indices
  risks: Array<{ id: string; title: string; detail: string; severity: "low" | "medium" | "high" }>;
  offers: Array<{ id: string; name: string; limit: string; rate: string; type: string }>;
};

const mockRunAI = (seed = 1): Analysis => {
  // deterministic-ish simple generator
  const rand = (n: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) * n;
  };

  const today = new Date();
  const days = 90;
  const threshold = 200_000; // ₹2,00,000 comfortable minimum
  const base = 450_000 + rand(100_000); // starting cash

  const forecast: Analysis["forecast"] = Array.from({ length: days }, (_, i) => {
    // simulate seasonality + trend + noise
    const trend = i * 1_200; // slow build-up
    const season = Math.sin((i / 14) * Math.PI) * 40_000; // bi-weekly swings
    const noise = rand(30_000) - 15_000;
    const outflows = 380_000 + Math.max(0, Math.sin((i / 7) * Math.PI) * 25_000);
    const inflows = 400_000 + trend + season + noise;
    const projectedCash = Math.max(0, base + inflows - outflows - i * 5_000);
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    return {
      day: i + 1,
      date: d.toLocaleDateString("en-IN", { month: "short", day: "2-digit" }),
      projectedCash,
    };
  });

  // detect shortfall windows vs threshold
  const shortfalls: Analysis["shortfalls"] = [];
  let activeStart: number | null = null;
  let minCash = Infinity;

  forecast.forEach((p, idx) => {
    if (p.projectedCash < threshold) {
      if (activeStart === null) activeStart = idx;
      if (p.projectedCash < minCash) minCash = p.projectedCash;
    } else if (activeStart !== null) {
      shortfalls.push({ from: activeStart + 1, to: idx, minCash });
      activeStart = null;
      minCash = Infinity;
    }
  });
  if (activeStart !== null) {
    shortfalls.push({ from: activeStart + 1, to: forecast.length, minCash });
  }

  const shortfallCount = shortfalls.length;

  const analysis: Analysis = {
    kpis: {
      cashFlowStatus: shortfallCount === 0 ? "Healthy" : shortfallCount < 3 ? "Tight" : "Critical",
      revenueGrowthPct: Math.round(8 + rand(10)),
      expenseOptimizationNote: "Ops, logistics, and utilities show 6–9% savings potential.",
      benchmarkPercentile: Math.round(65 + rand(20)),
    },
    forecast,
    threshold,
    shortfalls,
    risks: [
      shortfallCount
        ? {
            id: "runway",
            title: "Low cash runway",
            detail: `Projected balance dips below ₹${(threshold / 1_000).toFixed(0)}k in ${shortfallCount} window(s).`,
            severity: shortfallCount > 2 ? "high" : "medium",
          }
        : {
            id: "stable",
            title: "Stable liquidity",
            detail: "No shortfalls detected in the next 90 days.",
            severity: "low",
          },
      {
        id: "sales",
        title: "Softening revenue trend",
        detail: "Trailing 4-week momentum is below the 12-week average.",
        severity: "medium",
      },
      {
        id: "expense",
        title: "Expense spikes detected",
        detail: "Utilities and logistics volatility above peer median.",
        severity: "low",
      },
    ],
    offers: [
      { id: "wc-flex", name: "Working Capital Facility (ABCL)", limit: "Up to ₹50L", rate: "from 8.5%", type: "working-capital" },
      { id: "pl-smart", name: "Proactive Personal Credit (ABCL)", limit: "Up to ₹20L", rate: "from 10.5%", type: "personal" },
      { id: "stul-easy", name: "Short-Term Utility Credit (ABCL)", limit: "Up to ₹15L", rate: "from 9.5%", type: "stul" },
    ],
  };
  return analysis;
};

const Stepper: React.FC<{ current: number; gstComplete: boolean }> = ({ current, gstComplete }) => {
  const steps = [
    { id: "gst", label: "GST Details", icon: FileText, status: gstComplete ? "completed" : "current" },
    ...docSteps.map((step, index) => ({
      ...step,
      label: step.id.replace(/([A-Z])/g, " $1").toUpperCase(),
      status: index < current ? "completed" : index === current ? "current" : "pending"
    }))
  ];

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap">
      {steps.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex items-center justify-center rounded-full w-14 h-14 text-white text-lg font-bold transition-all duration-500 shadow-lg relative ${
                s.status === "completed" 
                  ? "bg-green-500 scale-105 shadow-green-500/30" 
                  : s.status === "current" 
                  ? "bg-primary animate-pulse shadow-primary/30" 
                  : "bg-gray-300"
              }`}
              aria-label={`Step ${i + 1}: ${s.label}`}
            >
              {s.status === "completed" ? (
                <Check className="w-6 h-6 animate-bounce" />
              ) : (
                <s.icon className="w-6 h-6" />
              )}
              {s.status === "current" && (
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
              )}
            </div>
            <div className={`text-xs sm:text-sm font-medium transition-colors duration-300 text-center ${
              s.status === "completed" ? "text-green-600" : s.status === "current" ? "text-primary" : "text-muted-foreground"
            }`}>
              {s.label}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 sm:w-12 h-1 rounded-full transition-all duration-500 ${
                s.status === "completed" ? "bg-green-500 shadow-lg shadow-green-500/30" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const EnhancedKPI: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  badge?: string;
  tone?: "default" | "good" | "warn" | "bad";
  trend?: string;
  description?: string;
}> = ({ title, value, icon, badge, tone = "default", trend, description }) => (
  <Card className="hover:shadow-lg transition-all duration-300 h-full border border-muted/50 hover:border-primary/40 bg-gradient-to-br from-white to-primary/5">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">{title}</CardTitle>
        <div className={`p-1.5 rounded-lg ${
          tone === "good" 
            ? "bg-green-100 text-green-600" 
            : tone === "bad" 
            ? "bg-red-100 text-red-600" 
            : tone === "warn" 
            ? "bg-amber-100 text-amber-600" 
            : "bg-primary/10 text-primary"
        }`}>
          <div className="w-4 h-4">{icon}</div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0 space-y-2">
      <div className="flex items-end justify-between">
        <div
          className={`text-xl font-bold ${
            tone === "good"
              ? "text-green-600"
              : tone === "bad"
              ? "text-red-600"
              : tone === "warn"
              ? "text-amber-600"
              : "text-foreground"
          }`}
        >
          {value}
        </div>
        {badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          <div className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full ${
            trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend.startsWith('+') ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />}
            {trend}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

const currencyShort = (v: number) => `₹${(v / 1_000).toFixed(0)}k`;
const currencyFull = (v: number) => `₹${v.toLocaleString("en-IN")}`;

const ForecastChart: React.FC<{ data: Analysis["forecast"]; threshold: number }> = ({ data, threshold }) => (
  <div className="h-40 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 15, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" minTickGap={20} fontSize={10} />
        <YAxis tickFormatter={(v) => currencyShort(Number(v))} fontSize={10} />
        <Tooltip formatter={(v: number) => currencyFull(v)} />
        <ReferenceLine
          y={threshold}
          stroke="#94a3b8"
          strokeDasharray="6 4"
          label={{ value: "Threshold", position: "right", fontSize: 10 }}
        />
        <Line type="monotone" dataKey="projectedCash" stroke="#2563eb" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const RiskBadge: React.FC<{ severity: "low" | "medium" | "high" }> = ({ severity }) => {
  const map = {
    low: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
  } as const;
  return <span className={`px-2 py-0.5 text-xs rounded ${map[severity]}`}>{severity.toUpperCase()}</span>;
};

const FinancialHealthDetails: React.FC = () => {
  const [step, setStep] = useState(2); // Start directly at stepper
  const [docStep, setDocStep] = useState(0);
  const [selectedSoftware, setSelectedSoftware] = useState<string>("gst-auto");
  const [checked, setChecked] = useState<Record<DocStepId, boolean>>({
    cibil: false,
    itr: false,
    bankStatement: false,
  });
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [gstAutoSelected, setGstAutoSelected] = useState(true);
  
  // Talking animation states
  const [displayedText, setDisplayedText] = useState('');
  const [showDots, setShowDots] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(true);
    const [isTyping, setIsTyping] = useState(true);
  
  
  const fullText = "Let me help you understand your business's financial health and a detailed report of your business.";

  const handleSoftwareConnect = (software: string) => {
    setSelectedSoftware(software);
    setStep(2);
  };

  const handleCheckboxChange = (id: DocStepId, value: boolean) => {
    setChecked((p) => ({ ...p, [id]: value }));
  };

  const handleNextDocStep = () => {
    if (docStep < docSteps.length - 1) {
      setDocStep((p) => p + 1);
    } else {
      setStep(3);
    }
  };

  // Talking animation effect
  useEffect(() => {
    // Show typing dots for 2 seconds
    setTimeout(() => {
      setShowDots(false);
      setIsTyping(true);
      
      // Type out the text character by character
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 2000);
  }, []);
  // Simulate AI run during loading
  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(() => {
        const res = mockRunAI(7);
        setAnalysis(res);
        setStep(4);
      }, 1600);
      return () => clearTimeout(t);
    }
  }, [step]);

  // ---- STEP 1: Connect to Accounting Software ----
  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 p-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Connect to Accounting Software</h2>
          <p className="text-muted-foreground text-lg">Use Tally or Zoho Books to sync data</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-lg mx-auto">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-4 p-8 h-32 hover:bg-primary/5 transition-all border-2 border-dashed hover:border-primary/50"
            onClick={() => handleSoftwareConnect("tally")}
          >
            <FileText className="w-8 h-8 text-primary" />
            <span className="font-semibold text-lg">Tally</span>
          </Button>

          <Button
            variant="outline" 
            className="flex flex-col items-center justify-center gap-4 p-8 h-32 hover:bg-primary/5 transition-all border-2 border-dashed hover:border-primary/50"
            onClick={() => handleSoftwareConnect("zoho")}
          >
            <Building className="w-8 h-8 text-primary" />
            <span className="font-semibold text-lg">Zoho Books</span>
          </Button>
        </div>

        <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Why connect?
            </CardTitle>
            <CardDescription className="text-base">Get dynamic cash flow forecasts, risk alerts, and tailored credit options.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm space-y-3">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> <span>Faster insights with real-time data</span></li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> <span>Automated risk monitoring</span></li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /> <span>Personalized credit options</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- STEP 2: Document Stepper (Now the main view) ----
  if (step === 2) {
    const current = docStep;
    const currentDoc = docSteps[docStep];

    return (
      <div className="max-w-4xl mx-auto space-y-8 p-4">
        {/* Header with Muneem Ji Talking */}
        
        <div className="text-center space-y-6">
          {/* Muneem Ji Avatar with Talking Animation */}
         <div className="relative">
               <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                 <CardContent className="p-8">
                   <div className="flex items-center gap-8">
                     <div className="relative flex-shrink-0">
                       <img
                         src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                         alt="Muneem Ji"
                         className={`h-32 w-24  transition-all duration-500 ${
                           isTyping ? 'scale-105 shadow-primary/20' : 'scale-100'
                         }`}
                         style={{
                          animation: isTyping
                            ? 'bounce 0.8s 1.5 forwards, 1.5s infinite'
                            : ''
                        }}
                       />
                       <div className={`absolute -top-2 -right-2 h-6 w-6 rounded-full border-3 border-white transition-all duration-300 ${
                         isTyping ? 'bg-orange-500 animate-ping scale-110' : 'bg-green-500 animate-pulse'
                       }`}></div>
                       
                       {/* Sound waves animation */}
                       {isTyping && (
                         <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                           <div className="flex gap-1">
                             <div className="w-1 bg-primary/40 rounded-full animate-bounce" style={{ height: '8px', animationDelay: '0ms' }}></div>
                             <div className="w-1 bg-primary/60 rounded-full animate-bounce" style={{ height: '16px', animationDelay: '100ms' }}></div>
                             <div className="w-1 bg-primary/40 rounded-full animate-bounce" style={{ height: '12px', animationDelay: '200ms' }}></div>
                             <div className="w-1 bg-primary/60 rounded-full animate-bounce" style={{ height: '20px', animationDelay: '300ms' }}></div>
                             <div className="w-1 bg-primary/40 rounded-full animate-bounce" style={{ height: '8px', animationDelay: '400ms' }}></div>
                           </div>
                         </div>
                       )}
                     </div>
                     
                     <div className="flex-1 space-y-4">
                       <div className="flex items-center gap-3">
                         <h1 className="text-3xl font-bold text-foreground">Analyzing your financial data</h1>
                         {isTyping && <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>}
                       </div>
                       
                       {showDots && (
                         <div className="flex items-center gap-2 py-4">
                           <div className="flex gap-1">
                             <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                             <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                             <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                           </div>
                           <span className="text-lg text-muted-foreground ml-3 animate-pulse">Analyzing market data...</span>
                         </div>
                       )}
                       
                       {!showDots && (
                         <div className="min-h-[80px]">
                           <p className="text-lg text-foreground leading-relaxed">
                             {displayedText}
                             {isTyping && <span className="inline-block w-1 h-6 bg-primary ml-1 animate-ping"></span>}
                           </p>
                         </div>
                       )}
                     </div>
                   </div>
                 </CardContent>
               </Card>
             </div>
       
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Financial Health Assessment</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Complete the steps below for AI-powered insights</p>
          </div>
        </div>

        {/* Interactive Stepper */}
        <Card className="border-2 border-primary/10 shadow-xl">
          <CardHeader className="pb-6">
            <Stepper current={current} gstComplete={gstAutoSelected} />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* GST Auto-Selected Message */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">GST Details Available</p>
                  <p className="text-sm text-green-600">Your GST information has been automatically detected and verified.</p>
                </div>
              </div>
            </div>

            {/* Current Step */}
            <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-xl">
                  <currentDoc.icon className="w-6 h-6 text-primary animate-bounce" /> 
                  Provide {currentDoc.id.replace(/([A-Z])/g, " $1").toUpperCase()}
                </CardTitle>
                <CardDescription className="text-base">
                  {currentDoc.id === 'cibil' && 'Upload your CIBIL report or connect your credit bureau account'}
                  {currentDoc.id === 'itr' && 'Share your Income Tax Returns for the last 2 years'}
                  {currentDoc.id === 'bankStatement' && 'Connect your bank account or upload statements'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-white border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors min-w-64 cursor-pointer hover:bg-primary/5">
                  <Checkbox
                    id={currentDoc.id}
                    checked={checked[currentDoc.id]}
                    onCheckedChange={(v) => handleCheckboxChange(currentDoc.id, Boolean(v))}
                    className="w-6 h-6 border-2"
                  />
                  <Label htmlFor={currentDoc.id} className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                    <ShieldCheck className="w-6 h-6 text-primary" /> 
                    Document Confirmed
                  </Label>
                </div>

                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>All data is encrypted and secure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          disabled={!checked[currentDoc.id]}
          onClick={handleNextDocStep}
        >
          {docStep < docSteps.length - 1 ? (
            <span className="flex items-center gap-3">
              Continue to Next Step <ArrowRight className="w-5 h-5" />
            </span>
          ) : (
            <span className="flex items-center gap-3">
              Generate AI Assessment <Activity className="w-6 h-6 animate-pulse" />
            </span>
          )}
        </Button>
      </div>
    );
  }

  // ---- STEP 3: Loading + Promo ----
  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 space-y-8 text-center p-4">
        <div className="flex items-center gap-4">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
          <p className="text-xl font-semibold">Analyzing your financial data…</p>
        </div>

        <Card className="w-full max-w-lg border-2 border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Smart Business Perks</CardTitle>
            <CardDescription className="text-base">Insights & flexible credit options tailored to you</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <p className="text-base">Unlock proactive facilities aligned to upcoming cash needs.</p>
            <div className="bg-primary/10 p-4 rounded-lg text-center border border-primary/20">
              <p className="font-bold text-primary text-lg">ABCL Advantage</p>
              <p className="text-muted-foreground">Preferential rates • Quick onboarding</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- STEP 4: AI-Powered Dashboard ----
  const tone =
    analysis?.kpis.cashFlowStatus === "Healthy"
      ? "good"
      : analysis?.kpis.cashFlowStatus === "Tight"
      ? "warn"
      : "bad";

  return (
    <div className="space-y-4 p-2 bg-gradient-to-br from-background via-background to-primary/5 min-h-screen">
      {/* Compact Header */}
      <div className="text-center max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AI-Powered Financial Health & Risk Assessment
          </h2>
          <div className="p-1 bg-gradient-to-r from-primary to-primary/70 rounded-full">
            <Zap className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            Live Data
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-500" />
            AI Powered
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-blue-500" />
            Secure
          </div>
        </div>
      </div>

      {/* Compact Dashboard */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-3">
        {/* Financial Health Score */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full border border-muted/50 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-center">Health Score</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {analysis ? Math.round((analysis.kpis.benchmarkPercentile + (analysis.kpis.revenueGrowthPct * 2) + (analysis.kpis.cashFlowStatus === 'Healthy' ? 30 : analysis.kpis.cashFlowStatus === 'Tight' ? 15 : 5)) / 3) : 75}
              </div>
              <div className="text-xs text-muted-foreground mb-2">Out of 100</div>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPI Cards */}
        <div className="col-span-12 lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <EnhancedKPI
            title="Cash Flow"
            value={analysis ? analysis.kpis.cashFlowStatus : "—"}
            icon={<TrendingUp />}
            tone={tone as any}
            badge="AI"
            trend={
              analysis?.kpis.cashFlowStatus === "Healthy"
                ? "+12%"
                : analysis?.kpis.cashFlowStatus === "Tight"
                ? "-3%"
                : "-8%"
            }
          />
          <EnhancedKPI
            title="Revenue"
            value={`${analysis ? analysis.kpis.revenueGrowthPct : 0}%`}
            icon={<DollarSign />}
            tone={
              analysis && analysis.kpis.revenueGrowthPct >= 10
                ? "good"
                : "default"
            }
            badge="MoM"
            trend={
              analysis && analysis.kpis.revenueGrowthPct >= 10
                ? "+2.3%"
                : "-1.1%"
            }
          />
          <EnhancedKPI
            title="Efficiency"
            value="6-9%"
            icon={<Target />}
            tone="good"
            badge="Save"
            trend="+15%"
          />
          <EnhancedKPI
            title="Industry"
            value={`${analysis ? analysis.kpis.benchmarkPercentile : 0}th`}
            icon={<Award />}
            tone="good"
            badge="Rank"
            trend="+5"
          />
        </div>
      </div>

      {/* Compact Forecast & Risk Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-3">
        {/* Cash Flow Forecast */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-full border border-muted/50 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Cash Flow Forecast
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">90 Days</Badge>
                  <Badge variant="secondary" className="text-xs">Live</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis && (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                      <div className="text-lg font-bold text-green-600">₹{((analysis.forecast[29]?.projectedCash || 0) / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-green-700">30d</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">₹{((analysis.forecast[59]?.projectedCash || 0) / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-blue-700">60d</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded border border-purple-200">
                      <div className="text-lg font-bold text-purple-600">₹{((analysis.forecast[89]?.projectedCash || 0) / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-purple-700">90d</div>
                    </div>
                  </div>
                  
                  <ForecastChart data={analysis.forecast} threshold={analysis.threshold} />
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Risk Alerts */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="h-full border border-muted/50 bg-gradient-to-br from-white to-red-50/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  Risk Alerts
                </div>
                <Badge variant="outline" className="text-xs">{analysis?.risks.length || 0}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysis?.risks.slice(0, 3).map((r, index) => (
                <div
                  key={r.id}
                  className={`p-3 rounded border transition-all ${
                    r.severity === 'high' 
                      ? 'border-red-200 bg-red-50/50' 
                      : r.severity === 'medium'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-green-200 bg-green-50/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`p-1 rounded-full mt-0.5 ${
                      r.severity === 'high' ? 'bg-red-100' : r.severity === 'medium' ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      {r.severity === 'high' ? (
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                      ) : r.severity === 'medium' ? (
                        <Activity className="w-3 h-3 text-amber-600" />
                      ) : (
                        <Check className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm flex items-center gap-2">
                        {r.title}
                        <RiskBadge severity={r.severity} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{r.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>


      {/* Pre-approved Offers Row */}
      <div className="max-w-6xl mx-auto">
        <Card className="border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-blue-50/30">
          <CardHeader className="pb-3">
            <div className="text-center">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Exclusive Pre-approved Offers
                <Star className="w-4 h-4 text-amber-500" />
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Premium credit solutions • Instant approval • Competitive rates
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {analysis?.offers.map((o, index) => (
                <Card
                  key={o.id}
                  className="border border-muted/50 hover:shadow-lg transition-all duration-300 hover:border-primary/50 bg-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-primary to-transparent opacity-20"></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                      <div className={`p-1 rounded ${
                        o.type === 'working-capital' ? 'bg-blue-100' : 
                        o.type === 'personal' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {o.type === 'working-capital' ? <Building className="w-4 h-4 text-blue-600" /> : 
                         o.type === 'personal' ? <DollarSign className="w-4 h-4 text-green-600" /> : 
                         <Zap className="w-4 h-4 text-purple-600" />}
                      </div>
                    </div>
                    <CardTitle className="text-sm font-bold leading-tight">{o.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                        <span>Limit</span>
                        <span className="font-bold text-primary">{o.limit}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                        <span>Rate</span>
                        <Badge variant="secondary" className="text-xs">{o.rate}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200 text-xs">
                        <span className="text-green-700">Status</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">Pre-approved</Badge>
                      </div>
                    </div>
                    <Button className="w-full h-8 text-xs font-bold bg-gradient-to-r from-primary to-blue-600">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center p-3 bg-gradient-to-r from-primary/10 to-blue-50 rounded border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-bold text-sm">ABCL Advantage</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  <span>0% fee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  <span>Flexible terms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Footer */}
      <div className="max-w-6xl mx-auto">
        <Card className="border border-muted/50 bg-gradient-to-r from-muted/20 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Complete Report</h3>
                <p className="text-xs text-muted-foreground">Download full analysis</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="h-8 text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  Summary
                </Button>
                <Button className="h-8 text-xs bg-gradient-to-r from-primary to-blue-600">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t text-center">
              <div>
                <div className="text-lg font-bold text-primary">90+</div>
                <div className="text-xs text-muted-foreground">Data Points</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">98.5%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">24/7</div>
                <div className="text-xs text-muted-foreground">Monitoring</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">AI</div>
                <div className="text-xs text-muted-foreground">Powered</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialHealthDetails;
