import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  TrendingUp, 
  Target, 
  Users, 
  BookOpen, 
  Download,
  Globe,
  MapPin,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building,
  FileText,
  CreditCard,
  Activity
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface InteractiveMuneemGrowthAdvisorProps {
  onClose?: () => void;
}

const InteractiveMuneemGrowthAdvisor: React.FC<InteractiveMuneemGrowthAdvisorProps> = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState<'advisor' | 'health'>('advisor');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [docChecked, setDocChecked] = useState({
    gst: false,
    banking: false,
    financials: false
  });

  // Muneem Ji talking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { 
      id: 'gst', 
      title: 'GST Registration Details',
      icon: FileText,
      description: 'Your GST details are automatically fetched from our system',
      status: 'completed'
    },
    { 
      id: 'banking', 
      title: 'Banking Information',
      icon: CreditCard,
      description: 'Connect your business banking details for analysis',
      status: 'current'
    },
    { 
      id: 'financials', 
      title: 'Financial Analysis',
      icon: Activity,
      description: 'Complete financial health assessment',
      status: 'pending'
    }
  ];

  const handleStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleDocumentCheck = (docType: string, checked: boolean) => {
    setDocChecked(prev => ({ ...prev, [docType]: checked }));
  };

  const TalkingAvatar = () => (
    <div className="relative">
      <div className={`h-20 w-20 rounded-full border-4 border-white shadow-xl overflow-hidden transition-all duration-300 ${
        isAnimating ? 'scale-110' : 'scale-100'
      }`}>
        <img
          src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
          alt="Muneem Ji"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      {isAnimating && (
        <div className="absolute -top-2 -right-2 w-4 h-4">
          <div className="w-full h-full bg-blue-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );

  const SpeechBubble = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <div 
      className={`bg-white rounded-2xl rounded-tl-sm p-4 shadow-lg relative animate-fade-in border-2 border-primary/10`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-white border-r-8 border-r-transparent"></div>
      {children}
    </div>
  );

  if (currentSection === 'advisor') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto p-6">
        {/* Muneem Ji Introduction */}
        <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border-primary/20 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <TalkingAvatar />
              <div className="flex-1 space-y-4">
                <SpeechBubble>
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1 animate-pulse" />
                    <div>
                      <p className="font-bold text-primary text-lg mb-2">🙏 Namaste! I'm your Muneem Ji Growth Advisor</p>
                      <p className="text-foreground text-base leading-relaxed">
                        Let's explore the best ways to grow your business together. I'll analyze your current position, 
                        identify opportunities, and guide you through strategic growth recommendations tailored specifically for your industry.
                      </p>
                    </div>
                  </div>
                </SpeechBubble>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setCurrentSection('health')}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Activity className="h-4 w-4" />
                    Start Financial Health Check
                    <ArrowRight className="h-4 w-4 animate-bounce" />
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    View Growth Analysis
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Growth Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-sm text-muted-foreground">Discover untapped market potential</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Strategic Planning</h3>
              <p className="text-sm text-muted-foreground">Create actionable growth plans</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Market Analysis</h3>
              <p className="text-sm text-muted-foreground">Understand your competitive position</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Financial Health Header */}
      <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border-primary/20 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <TalkingAvatar />
            <div className="flex-1">
              <SpeechBubble>
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-bold text-primary text-lg mb-2">Let me help you understand your business's financial health</p>
                    <p className="text-foreground text-base leading-relaxed">
                      I'll analyze your financial data and generate a detailed report with personalized recommendations 
                      to improve your business performance and identify growth opportunities.
                    </p>
                  </div>
                </div>
              </SpeechBubble>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Stepper */}
      <Card className="shadow-lg border-2 border-primary/10">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <Zap className="h-6 w-6 text-primary" />
            Financial Health Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round((completedSteps.length / steps.length) * 100)}% Complete</span>
            </div>
            <Progress value={(completedSteps.length / steps.length) * 100} className="h-2" />
          </div>

          {/* Stepper */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index) || step.status === 'completed';
              const isCurrent = currentStep === index && !isCompleted;
              const isPending = index > currentStep && !isCompleted;

              return (
                <div key={step.id} className="flex items-start gap-6">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <div className={`
                      flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg' 
                        : isCurrent 
                        ? 'bg-primary border-primary text-white animate-pulse shadow-lg' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="h-8 w-8" />
                      ) : (
                        <step.icon className="h-8 w-8" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-1 h-16 mt-4 transition-colors duration-300 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <Card className={`transition-all duration-300 ${
                      isCurrent ? 'border-primary/50 shadow-lg bg-primary/5' : 
                      isCompleted ? 'border-green-500/50 bg-green-50' : 
                      'border-gray-200'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {step.title}
                              {isCompleted && <Badge className="bg-green-100 text-green-800">Completed</Badge>}
                              {isCurrent && <Badge className="bg-primary/10 text-primary animate-pulse">In Progress</Badge>}
                            </h3>
                            <p className="text-muted-foreground mt-1">{step.description}</p>
                          </div>
                        </div>

                        {/* Step-specific content */}
                        {step.id === 'gst' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="font-medium text-green-800">GST Details Available ✓</p>
                                <p className="text-sm text-green-600">Registration verified and data synced</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 'banking' && isCurrent && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <Checkbox 
                                  id="bank-statements"
                                  checked={docChecked.banking}
                                  onCheckedChange={(checked) => handleDocumentCheck('banking', !!checked)}
                                />
                                <Label htmlFor="bank-statements" className="flex items-center gap-2 cursor-pointer">
                                  <Building className="h-4 w-4 text-primary" />
                                  Bank Statements (6 months)
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <Checkbox id="cash-flow" />
                                <Label htmlFor="cash-flow" className="flex items-center gap-2 cursor-pointer">
                                  <TrendingUp className="h-4 w-4 text-primary" />
                                  Cash Flow Records
                                </Label>
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleStepComplete(index)}
                              disabled={!docChecked.banking}
                              className="w-full mt-4"
                            >
                              Continue to Financial Analysis
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        )}

                        {step.id === 'financials' && isCurrent && (
                          <div className="text-center py-8">
                            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="font-medium">Analyzing your financial data...</p>
                            <p className="text-sm text-muted-foreground">This will take just a moment</p>
                          </div>
                        )}

                        {isCompleted && step.id === 'financials' && (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <CheckCircle className="h-5 w-5 text-primary" />
                              <p className="font-medium text-primary">Financial Analysis Complete!</p>
                            </div>
                            <Button className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download Health Report
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back to Growth Advisor */}
          <div className="mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection('advisor')}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Growth Advisor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveMuneemGrowthAdvisor;