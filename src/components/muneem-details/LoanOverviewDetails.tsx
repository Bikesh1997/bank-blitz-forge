import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';

const LoanOverviewDetails: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const analysisSteps = [
    "Namaste! Main aapke liye best loan options dhoondh raha hun...",
    "Aapke business profile ko analyze kar raha hun - ₹5 crore turnover, manufacturing...",
    "Equipment finance aur working capital loans check kar raha hun...",
    "Interest rates aur processing time compare kar raha hun...",
    "Pre-approved offers ready kar raha hun aapke liye...",
    "Perfect! Aapke liye sabse achhe loan options ready hain!"
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
                              Loan Expert
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
                <h1 className="text-xl font-bold text-foreground">Recommended Loan Opportunities</h1>
                <p className="text-sm text-muted-foreground">
                  Based on your profile: Equipment Finance, Pre-approved offers available
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
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Recommended Loan Opportunities
        </h3>
        <p className="text-sm text-muted-foreground">
          Based on your profile: Equipment Finance, Pre-approved offers available
        </p>
      </div>

      {/* Best Match */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Star className="h-4 w-4 text-primary fill-primary" />
              Best Match for You
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Recommended
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
              <p className="font-semibold text-lg text-foreground">₹1-3 Crores</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate</p>
              <p className="font-semibold text-lg text-primary">9.2% p.a.*</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Processing Time</p>
              <p className="font-medium text-foreground">7-10 days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Loan Type</p>
              <p className="font-medium text-foreground">Equipment Finance</p>
            </div>
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
            size="lg"
          >
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Other Options */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Other Loan Options</h4>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Working Capital Loan</h5>
                <p className="text-sm text-muted-foreground">₹2-8 Lakhs • 11.2% p.a.*</p>
                <p className="text-xs text-muted-foreground">Quick approval for business operations</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Equipment Finance</h5>
                <p className="text-sm text-muted-foreground">₹5-20 Lakhs • 10.8% p.a.*</p>
                <p className="text-xs text-muted-foreground">Finance new machinery and equipment</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Business Expansion Loan</h5>
                <p className="text-sm text-muted-foreground">₹10-50 Lakhs • 12.5% p.a.*</p>
                <p className="text-xs text-muted-foreground">Scale your business operations</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

          <div className="text-xs text-muted-foreground">
            *Interest rates are subject to credit evaluation and may vary based on your profile and market conditions.
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanOverviewDetails;
