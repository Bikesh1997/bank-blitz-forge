import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  TrendingUp, 
  Calculator, 
  HelpCircle,
  ChevronRight,
  BarChart3,
  Target,
  Lightbulb
} from 'lucide-react';

const BusinessPlanningDetails: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const analysisSteps = [
    "Namaste! Main aapke business planning mein help karunga...",
    "What-if analysis aur forecasting tools ready kar raha hun...", 
    "Business goals aur market analysis features set kar raha hun...",
    "Revenue projections aur resource planning tools prepare kar raha hun...",
    "AI-powered business insights generate kar raha hun...",
    "Perfect! Aapka complete business planning suite ready hai!"
  ];

  useEffect(() => {
    if (currentStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setDisplayedText('');
        
        let currentIndex = 0;
        const currentText = analysisSteps[currentStep];
        const typingInterval = setInterval(() => {
          if (currentIndex <= currentText.length) {
            setDisplayedText(currentText.slice(0, currentIndex));
            currentIndex++;
          } else {
            setIsTyping(false);
            clearInterval(typingInterval);
            
            setTimeout(() => {
              if (currentStep === analysisSteps.length - 1) {
                setIsAnalyzing(false);
                setShowResults(true);
              } else {
                setCurrentStep(prev => prev + 1);
              }
            }, 1500);
          }
        }, 50);

        return () => clearInterval(typingInterval);
      }, currentStep === 0 ? 1000 : 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);
  const [activeTab, setActiveTab] = useState<'whatif' | 'forecast'>('whatif');
  const [whatIfQuery, setWhatIfQuery] = useState('');
  const [planningStep, setPlanningStep] = useState(1);

  const whatIfExamples = [
    "What happens to my profit if I add 2 more vendors in my supply chain?",
    "How would hiring 3 new employees affect my monthly expenses?",
    "What if I increase my product price by 10%?",
    "How would expanding to a new city impact my revenue?"
  ];

  const forecastSteps = [
    { step: 1, title: "Business Overview", description: "Tell us about your current business" },
    { step: 2, title: "Financial Goals", description: "Set your revenue and growth targets" },
    { step: 3, title: "Market Analysis", description: "Analyze your market opportunity" },
    { step: 4, title: "Resource Planning", description: "Plan your resources and investments" }
  ];

  const handleWhatIfSubmit = () => {
    if (!whatIfQuery.trim()) return;
    
    // Simulate AI response
    alert(`Analyzing: "${whatIfQuery}"\n\nBased on your current data:\n- Expected impact on monthly profit: +₹25,000\n- Payback period: 4-6 months\n- Risk level: Medium\n\nWould you like a detailed analysis report?`);
    setWhatIfQuery('');
  };

  if (activeTab === 'forecast' && planningStep > 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Guided Business Forecast</h2>
          <p className="text-muted-foreground">Step {planningStep} of 4: {forecastSteps[planningStep - 1].description}</p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            {forecastSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  planningStep > step.step 
                    ? 'bg-green-500 text-white' 
                    : planningStep === step.step 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.step}
                </div>
                {index < forecastSteps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{forecastSteps[planningStep - 1].title}</CardTitle>
            <CardDescription>{forecastSteps[planningStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {planningStep === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentRevenue">Current Monthly Revenue</Label>
                    <Input id="currentRevenue" placeholder="₹ 5,00,000" />
                  </div>
                  <div>
                    <Label htmlFor="targetRevenue">Target Monthly Revenue (12 months)</Label>
                    <Input id="targetRevenue" placeholder="₹ 8,00,000" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="growthGoals">Growth Goals</Label>
                  <Textarea 
                    id="growthGoals" 
                    placeholder="Describe your business growth objectives..."
                    rows={3}
                  />
                </div>
              </>
            )}
            
            {planningStep === 3 && (
              <>
                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input id="targetMarket" placeholder="SME manufacturers in Mumbai" />
                </div>
                <div>
                  <Label htmlFor="competition">Competition Analysis</Label>
                  <Textarea 
                    id="competition" 
                    placeholder="Describe your main competitors and market position..."
                    rows={3}
                  />
                </div>
              </>
            )}

            {planningStep === 4 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requiredInvestment">Required Investment</Label>
                    <Input id="requiredInvestment" placeholder="₹ 10,00,000" />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input id="timeline" placeholder="12 months" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="resources">Resource Requirements</Label>
                  <Textarea 
                    id="resources" 
                    placeholder="List required resources, staff, equipment..."
                    rows={3}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => planningStep > 1 ? setPlanningStep(planningStep - 1) : setActiveTab('whatif')}
          >
            Back
          </Button>
          <Button 
            onClick={() => planningStep < 4 ? setPlanningStep(planningStep + 1) : alert('Business forecast completed! Generating your comprehensive business plan...')}
          >
            {planningStep < 4 ? 'Next' : 'Generate Plan'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Muneem Ji Analysis Section */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl mx-auto bg-white/90 border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-12">
                <div className="relative flex-shrink-0">
                  <div className={`relative transition-all duration-700 ${
                    isTyping ? 'animate-pulse scale-105' : 'scale-100'
                  }`}>
                    <img
                      src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                      alt="Muneem Ji"
                      className="h-64 w-48 object-contain filter drop-shadow-lg"
                    />
                    <div className={`absolute -top-2 -right-2 h-6 w-6 rounded-full border-3 border-white transition-all duration-300 ${
                      isTyping ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                    }`}>
                      <div className={`absolute inset-1 rounded-full ${
                        isTyping ? 'bg-green-400 animate-ping' : 'bg-blue-400'
                      }`}></div>
                    </div>
                  </div>

                  {isTyping && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
                      <div className="flex items-center gap-1">
                        <div className="w-1 bg-primary/60 rounded-full animate-bounce" style={{ height: '12px', animationDelay: '0ms' }}></div>
                        <div className="w-1 bg-primary/80 rounded-full animate-bounce" style={{ height: '24px', animationDelay: '100ms' }}></div>
                        <div className="w-1 bg-primary/60 rounded-full animate-bounce" style={{ height: '16px', animationDelay: '200ms' }}></div>
                        <div className="w-1 bg-primary/80 rounded-full animate-bounce" style={{ height: '20px', animationDelay: '300ms' }}></div>
                        <div className="w-1 bg-primary/60 rounded-full animate-bounce" style={{ height: '14px', animationDelay: '400ms' }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <div className="absolute left-0 top-6 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[20px] border-r-white transform -translate-x-5"></div>
                    
                    <Card className="bg-white shadow-lg border-2 border-primary/10">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-foreground">Muneem Ji</h2>
                            <Badge className="bg-primary/10 text-primary border-primary/20">
                              Business Planning Expert
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted/30 rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2 transition-all duration-500" 
                                style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {currentStep + 1}/{analysisSteps.length}
                            </span>
                          </div>

                          <div className="min-h-[60px] flex items-center">
                            <p className="text-lg text-foreground leading-relaxed">
                              {displayedText}
                              {isTyping && <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-ping"></span>}
                            </p>
                          </div>

                          {!isTyping && currentStep < analysisSteps.length - 1 && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                              <span className="text-sm">Analyzing...</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Small Muneem Ji Header */}
      {showResults && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                  alt="Muneem Ji"
                  className="h-16 w-12 object-contain"
                />
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">Business Planning Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered business planning using natural language
                </p>
              </div>
              
              <MessageCircle className="h-5 w-5 text-primary animate-pulse" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Content */}
      {showResults && (
        <div className="animate-fade-in space-y-6" style={{ animationDelay: '500ms' }}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Business Planning Assistant</h2>
        <p className="text-muted-foreground">AI-powered business planning using natural language</p>
      </div>

      {/* Tab Selection */}
      <div className="flex space-x-2 bg-muted p-1 rounded-lg">
        <Button
          variant={activeTab === 'whatif' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('whatif')}
          className="flex-1"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          What If Analysis
        </Button>
        <Button
          variant={activeTab === 'forecast' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('forecast')}
          className="flex-1"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Business Forecast
        </Button>
      </div>

      {activeTab === 'whatif' ? (
        <div className="space-y-6">
          {/* What If Query */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Ask "What If" Questions
              </CardTitle>
              <CardDescription>
                Get instant insights by asking hypothetical business questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatif">Your Question</Label>
                <Textarea
                  id="whatif"
                  placeholder="What happens to my profit if I add 2 more vendors in my supply chain?"
                  value={whatIfQuery}
                  onChange={(e) => setWhatIfQuery(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleWhatIfSubmit} className="w-full">
                <Calculator className="h-4 w-4 mr-2" />
                Analyze Impact
              </Button>
            </CardContent>
          </Card>

          {/* Example Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Example Questions
              </CardTitle>
              <CardDescription>
                Click on any example to try it out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {whatIfExamples.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => setWhatIfQuery(example)}
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  {example}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Guided Forecast Introduction */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Target className="h-5 w-5" />
                Guided Business Forecast
              </CardTitle>
              <CardDescription>
                Build a comprehensive financial plan with our interactive guide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI will guide you through creating a robust business forecast in 4 simple steps. 
                Get insights on revenue projections, market opportunities, and resource planning.
              </p>
              <Button onClick={() => setPlanningStep(2)} className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Start Business Forecast
              </Button>
            </CardContent>
          </Card>

          {/* Forecast Steps Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forecastSteps.map((step, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                      {step.step}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default BusinessPlanningDetails;