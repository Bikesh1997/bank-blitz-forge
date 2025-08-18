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

const docSteps = [
  { id: "creditScore", icon: CreditCard },
  { id: "itr", icon: FileText },
  { id: "bankStatement", icon: Building },
] as const;

type DocStepId = (typeof docSteps)[number]["id"];

type Analysis = {
  kpis: {
    cashFlowStatus: "Healthy" | "Tight" | "Critical";
    revenueGrowthPct: number;
    expenseOptimizationNote: string;
    benchmarkPercentile: number;
  };
  forecast: Array<{ day: number; date: string; projectedCash: number }>;
  threshold: number;
  shortfalls: Array<{ from: number; to: number; minCash: number }>;
  risks: Array<{ id: string; title: string; detail: string; severity: "low" | "medium" | "high" }>;
  offers: Array<{ id: string; name: string; limit: string; rate: string; type: string }>;
};

const mockRunAI = (seed = 1): Analysis => {
  const rand = (n: number) => {
    seed = (seed * 9301 + 49297) % 233280;
    return (seed / 233280) * n;
  };

  const today = new Date();
  const days = 90;
  const threshold = 200_000;
  const base = 450_000 + rand(100_000);

  const forecast: Analysis["forecast"] = Array.from({ length: days }, (_, i) => {
    const trend = i * 1_200;
    const season = Math.sin((i / 14) * Math.PI) * 40_000;
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
    { id: "gst", label: "GST DETAILS", icon: FileText, status: gstComplete ? "completed" : "current" },
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
  const [step, setStep] = useState(2);
  const [docStep, setDocStep] = useState(0);
  const [selectedSoftware, setSelectedSoftware] = useState<string>("gst-auto");
  const [checked, setChecked] = useState<Record<DocStepId, boolean>>({
    creditScore: false,
    itr: false,
    bankStatement: false,
  });
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [gstAutoSelected, setGstAutoSelected] = useState(true);
  
  const [currentConversationStep, setCurrentConversationStep] = useState(0);
  const [showStepperContent, setShowStepperContent] = useState(false);
  
  const conversationSteps = [
    {
      message: "Chaliye ji, main aapko aapke business ki financial sehat aur detailed report samjhata hoon! 💰",
      delay: 1000,
      action: () => setCurrentConversationStep(1)
    },
    {
      message: "Sabse pehle main aapko document upload karne ke liye guide karunga - ye process bilkul simple hai!",
      delay: 2000,
      action: () => {
        setShowStepperContent(true);
        setCurrentConversationStep(2);
      }
    },
    {
      message: "Aapko sirf ye 3 documents chaiye: Credit Score check, ITR, aur Bank Statement. Main step-by-step batata hoon!",
      delay: 1500,
      action: () => setCurrentConversationStep(3)
    }
  ];

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

  useEffect(() => {
    conversationSteps.forEach((step, index) => {
      setTimeout(() => {
        step.action();
      }, step.delay + (index * 3000));
    });
  }, []);

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

  if (step === 2) {
    const current = docStep;
    const currentDoc = docSteps[docStep];

    return (
      <div className="max-w-5xl mx-auto space-y-4 p-2">
        {/* Muneem Ji Conversation Interface */}
        <div className="relative">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative flex-shrink-0">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                alt="Muneem Ji"
                className="h-16 w-16 rounded-full border-4 border-primary/20 animate-pulse"
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-bounce"></div>
            </div>
            
            <div className="flex-1 space-y-3">
              {conversationSteps.slice(0, currentConversationStep).map((step, index) => (
                <div
                  key={index}
                  className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-md p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <p className="text-foreground font-medium">{step.message}</p>
                  <div className="text-xs text-muted-foreground mt-2">Muneem Ji</div>
                </div>
              ))}
              
              {currentConversationStep > 0 && currentConversationStep <= conversationSteps.length && (
                <div className="flex items-center gap-2 bg-primary/5 rounded-2xl rounded-tl-md p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Muneem Ji is typing...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {showStepperContent && (
          <div className="animate-slide-in-right">
            <div className="text-center mb-6">
              <Stepper current={docStep} gstComplete={gstAutoSelected} />
            </div>

            <Card className="border border-primary/10">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto mb-3 p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 w-fit">
                  <currentDoc.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {currentDoc.id === 'creditScore' && 'Credit Score Assessment'}
                  {currentDoc.id === 'itr' && 'Income Tax Returns'}
                  {currentDoc.id === 'bankStatement' && 'Bank Statement Analysis'}
                </CardTitle>
                <CardDescription className="text-base">
                  {currentDoc.id === 'creditScore' && 'Check your credit score'}
                  {currentDoc.id === 'itr' && 'Upload your latest ITR filing'}
                  {currentDoc.id === 'bankStatement' && 'Upload your bank statement'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-6 border-2 border-dashed border-primary/30 rounded-lg text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="space-y-3">
                    <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <currentDoc.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {currentDoc.id === 'creditScore' && 'Click to check credit score'}
                        {currentDoc.id === 'itr' && 'Upload ITR document'}
                        {currentDoc.id === 'bankStatement' && 'Upload bank statement'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentDoc.id === 'creditScore' && 'Quick CIBIL check via secure connection'}
                        {currentDoc.id === 'itr' && 'PDF format accepted'}
                        {currentDoc.id === 'bankStatement' && '6 months statement preferred'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id={currentDoc.id}
                    checked={checked[currentDoc.id]}
                    onCheckedChange={(value) => handleCheckboxChange(currentDoc.id, value as boolean)}
                  />
                  <Label htmlFor={currentDoc.id} className="text-sm">
                    I confirm this document is accurate and up-to-date
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              disabled={!checked[currentDoc.id]}
              onClick={handleNextDocStep}
            >
              {docStep < docSteps.length - 1 ? (
                <span className="flex items-center gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Generate AI Assessment <Activity className="w-5 h-5 animate-pulse" />
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    );
  }

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

  const tone =
    analysis?.kpis.cashFlowStatus === "Healthy"
      ? "good"
      : analysis?.kpis.cashFlowStatus === "Tight"
      ? "warn"
      : "bad";

  return (
    <div className="space-y-10 p-4 bg-gradient-to-br from-background via-background to-primary/5 min-h-screen">
      <div className="text-center space-y-4 max-w-4xl mx-auto pt-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <div className="p-2 bg-gradient-to-r from-primary to-primary/70 rounded-full">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground">AI-Powered Financial Health Dashboard</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis of your business financial health with predictive insights and smart credit recommendations.
        </p>
      </div>

      <div className="grid gap-6 max-w-6xl mx-auto">
        <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2">
          <EnhancedKPI
            title="Cash Flow Status"
            value={analysis?.kpis.cashFlowStatus || "Analyzing..."}
            icon={<TrendingUp />}
            tone={tone}
          />
          <EnhancedKPI
            title="Revenue Growth"
            value={`+${analysis?.kpis.revenueGrowthPct || 0}%`}
            icon={<BarChart3 />}
            badge="MoM"
            tone="good"
            trend={`+${analysis?.kpis.revenueGrowthPct || 0}%`}
          />
          <EnhancedKPI
            title="Benchmark Position"
            value={`${analysis?.kpis.benchmarkPercentile || 0}th`}
            icon={<Target />}
            badge="Percentile"
            tone="good"
          />
          <EnhancedKPI
            title="Optimization Potential"
            value="6-9%"
            icon={<Zap />}
            badge="Cost Savings"
            tone="warn"
          />
        </div>

        {analysis && (
          <>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  90-Day Cash Flow Forecast
                </CardTitle>
                <CardDescription>Projected cash position with threshold monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <ForecastChart data={analysis.forecast} threshold={analysis.threshold} />
                {analysis.shortfalls.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">Cash Flow Alert</p>
                        <p className="text-sm text-amber-700">
                          {analysis.shortfalls.length} potential shortfall window(s) detected. 
                          Consider the credit options below to maintain healthy liquidity.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>Key risks and mitigation recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.risks.map((risk, idx) => (
                    <div key={risk.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="mt-1">
                        <RiskBadge severity={risk.severity} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{risk.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{risk.detail}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Pre-Qualified Credit Options
                  </CardTitle>
                  <CardDescription>Tailored facilities based on your financial profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.offers.map((offer, idx) => (
                    <div key={offer.id} className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{offer.name}</h4>
                        <Badge variant="secondary" className="text-xs">{offer.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Limit</p>
                          <p className="font-medium">{offer.limit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rate</p>
                          <p className="font-medium">{offer.rate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                className="btn-primary"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Complete Financial Health Report
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FinancialHealthDetails;