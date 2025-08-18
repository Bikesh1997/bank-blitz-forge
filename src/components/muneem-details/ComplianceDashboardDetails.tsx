import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, CheckCircle, Clock, MessageCircle } from 'lucide-react';

const ComplianceDashboardDetails: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const analysisSteps = [
    "Namaste! Aapke compliance status check kar raha hun...",
    "TDS status dekh raha hun - compliant hai, bahut achhi baat!",
    "Upcoming deadlines track kar raha hun - GST, ROC, ITR...",
    "Priority wise reminders set kar raha hun aapke liye...",
    "Calendar integration aur alerts ready kar raha hun...",
    "Perfect! Aapka complete compliance dashboard ready hai!"
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

  const upcomingReminders = [
    {
      id: 1,
      title: 'GST Return Filing',
      dueDate: '15th March 2024',
      status: 'due-soon',
      priority: 'high'
    },
    {
      id: 2,
      title: 'TDS Return (24Q)',
      dueDate: '31st March 2024',
      status: 'upcoming',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Annual ROC Filing',
      dueDate: '30th April 2024',
      status: 'upcoming',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Income Tax Return',
      dueDate: '31st July 2024',
      status: 'upcoming',
      priority: 'medium'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'due-soon':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string, priority: string) => {
    if (status === 'due-soon') {
      return <Badge variant="destructive" className="text-xs">Due Soon</Badge>;
    }
    if (priority === 'high') {
      return <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">High Priority</Badge>;
    }
    return <Badge variant="outline" className="text-xs">Upcoming</Badge>;
  };

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
                              Compliance Expert
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
                <h1 className="text-xl font-bold text-foreground">Compliance Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  TDS Status: Compliant • Upcoming deadlines tracked
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
          {/* TDS Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-foreground">TDS Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <p className="font-semibold text-green-700">Compliant</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground">Next Filing Due</p>
                  <p className="font-semibold text-blue-700">31st March</p>
                </div>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-muted-foreground">Outstanding Amount</p>
                <p className="font-semibold text-amber-700">₹0 (All Clear)</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Reminders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Upcoming Reminders</h4>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
            
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <Card key={reminder.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(reminder.status)}
                        <div>
                          <h5 className="font-medium text-foreground">{reminder.title}</h5>
                          <p className="text-sm text-muted-foreground">Due: {reminder.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(reminder.status, reminder.priority)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">View All Compliance Tasks</p>
                  <p className="text-sm text-muted-foreground">Complete overview of all regulatory requirements</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">Set Custom Reminders</p>
                  <p className="text-sm text-muted-foreground">Never miss important compliance deadlines</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <p className="font-medium">Download Compliance Report</p>
                  <p className="text-sm text-muted-foreground">Get detailed compliance status report</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceDashboardDetails;