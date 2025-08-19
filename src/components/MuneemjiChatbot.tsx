import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GrowthAdvisorDetails from '@/components/muneem-details/GrowthAdvisorDetails';
import FinancialHealthDetails from '@/components/muneem-details/FinancialHealthDetails';
import SmartComplianceDetails from '@/components/muneem-details/SmartComplianceDetails';
import VendorOptimizationDetails from '@/components/muneem-details/VendorOptimizationDetails';
import BusinessPlanningDetails from '@/components/muneem-details/BusinessPlanningDetails';
import RemindersDetails from '@/components/muneem-details/RemindersDetails';
import { Card, CardContent } from './ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MuneemjiChatbotProps {
  onNavigate?: (section: string) => void;
}

const MuneemjiChatbot: React.FC<MuneemjiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLargeMuneem, setShowLargeMuneem] = useState(true);
  

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatOptions = [
    { id: 'growth-advisor', label: 'Growth Advisor', icon: '📈' },
    { id: 'financial-health', label: 'Financial Health', icon: '💰' },
    { id: 'smart-compliance', label: 'Smart Compliance', icon: '📊' },
    { id: 'vendor-optimization', label: 'Vendor Optimization', icon: '🚚' },
    { id: 'business-planning', label: 'Business Planning', icon: '📋' },
    { id: 'reminders', label: 'Reminders', icon: '🔔' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

   const [activeTab, setActiveTab] = useState('global');
    const [isTyping, setIsTyping] = useState(true);
    const [displayedText, setDisplayedText] = useState('');
    const [showDots, setShowDots] = useState(true);
    
    const fullText = "Namaste! Main hoon Muneem Ji – aapke business ka digital saathi.";
  
    useEffect(() => {
      if (isOpen) {
        setDisplayedText('');
        setShowDots(true);
        setIsTyping(true);
        setShowOptions(false);
        setShowLargeMuneem(true);
    
        const dotsTimeout = setTimeout(() => {
          setShowDots(false);
          let currentIndex = 0;
          const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
              setDisplayedText(fullText.slice(0, currentIndex));
              currentIndex++;
            } else {
              setIsTyping(false);
              clearInterval(typingInterval);
              
              // After typing is complete, wait 20 seconds then show options and reduce Muneem Ji
              setTimeout(() => {
                setShowOptions(true);
                setShowLargeMuneem(false);
              }, 20000);
            }
          }, 50);
    
          return () => clearInterval(typingInterval);
        }, 2000);
    
        return () => clearTimeout(dotsTimeout);
      }
    }, [isOpen]);
    

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: '1',
          text: fullText,
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen]);


  const getMuneemjiImage = () => {
    return 'generated-image.png';
  };

  const handleOptionClick = (option: typeof chatOptions[0]) => {
    // Directly open popup without chat response
    setSelectedOption(option.id);
    setShowPopup(true);
    
    if (onNavigate) onNavigate(option.id);
  };


  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Samjha! Is query ke liye main aapko relevant section mein direct kar sakta hoon. Ya fir aap specific options mein se choose kar sakte hain.",
        isBot: true,
        timestamp: new Date()
      }]);
      setShowOptions(true);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([]);
    setShowOptions(true);
    setIsTyping(false);
  };

  const renderDetailComponent = (optionId: string) => {
    switch (optionId) {
      case 'growth-advisor':
        return <GrowthAdvisorDetails />;
      case 'financial-health':
        return <FinancialHealthDetails />;
      case 'smart-compliance':
        return <SmartComplianceDetails />;
      case 'vendor-optimization':
        return <VendorOptimizationDetails />;
      case 'business-planning':
        return <BusinessPlanningDetails />;
      case 'reminders':
        return <RemindersDetails />;
      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <>
      {/* Floating Launcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Open Muneem Ji Chat"
          className="
            muneemji-launcher relative
            h-32 w-32
            rounded-full bg-white shadow-xl transition-all duration-300
            border-4 border-white
            hover:shadow-2xl
          "
          style={{ backgroundColor: 'transparent' }}
        >
          <div
            className={`
              pointer-events-none select-none
              flex items-center justify-center
              h-full w-full
              animate-muneemji-bob
              ${hovered ? "scale-[1.05]" : "scale-100"}
              transition-transform duration-300
            `}
          >
            <img
              src={getMuneemjiImage()}
              alt="Muneem Ji"
              width={128}
              height={128}
              loading="eager"
              decoding="async"
              className="
                muneemji-avatar
                h-28 w-28
                object-contain
                animate-muneemji-wave
              "
            />
          </div>
          <div className="absolute -top-2.5 -right-2.5 h-7 w-7 bg-green-500 rounded-full border-2 border-white" />
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:inset-auto lg:bottom-6 lg:right-6 lg:h-[600px] lg:w-[430px]">
          <div className="h-full bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl border border-border flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                {/* <img 
                  src={getMuneemjiImage()}
                  alt="Muneem Ji"
                  className="h-10 w-10 object-contain bg-white/20 rounded-full p-1"
                /> */}
                <div>
                  <h3 className="font-semibold text-lg">Muneem Ji</h3>
                  <p className="text-xs opacity-90">Digital Business Saathi</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => {
                  setIsOpen(false);
                  // Reset chat when closed
                  // setTimeout(() => {
                  //   setMessages([]);
                  //   setShowOptions(true);
                  //   setIsTyping(true);
                  //   setSelectedOption(null);
                  // }, 300);
                }} className="text-white hover:bg-white/20 h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            {showLargeMuneem && (
              /* Large Animated Muneem Ji Presentation */
              <div className="min-h-[500px] flex p-4">
                <div className="relative flex items-center gap-8 max-w-5xl w-full">
                  
                  {/* Large Muneem Ji with wave animation */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={`${
                        process.env.NODE_ENV === "production"
                          ? "/aditya-birla-finance-limited/"
                          : "/"
                      }generated-image.png`}
                      alt="Muneem Ji"
                      className="h-60 w-60 md:h-60 md:w-60 animate-muneemji-wave"
                    />

                    {/* Thought bubble trail */}
                    <div className="absolute top-6 right-0 space-y-2 flex">
                      <div
                        className="w-2 h-2 bg-white rounded-full border-2 border-primary/30 shadow-md animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-white rounded-full border-2 border-primary/30 shadow-md animate-bounce"
                        style={{ animationDelay: "200ms" }}
                      ></div>
                      <div
                        className="w-4 h-4 bg-white rounded-full border-2 border-primary/30 shadow-md animate-bounce"
                        style={{ animationDelay: "400ms" }}
                      ></div>
                    </div>
                  </div>

                  <div className="relative flex-1 flex items-center justify-center">
                    <svg
                      viewBox="0 0 600 500"
                      className="drop-shadow-2xl"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M280 240
                           C200 240, 120 200, 130 150
                           C80 135, 95 70, 160 60
                           C175 25, 240 15, 270 60
                           C320 25, 420 40, 435 95
                           C500 95, 530 135, 515 185
                           C545 200, 530 255, 465 265
                           C420 305, 320 295, 270 270
                           C240 305, 160 290, 145 240
                           C175 270, 240 285, 280 240
                           Z"
                        fill="white"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        strokeOpacity="0.4"
                        transform="translate(-80, -5) rotate(-10 300 200) scale(1.1)"
                      />
                    </svg>

                    {/* Bubble content */}
                    <div className="absolute inset-0 flex items-start mt-16 justify-center p-6 pointer-events-none">
                      <div className="w-full max-w-sm text-center">
                        <div className="animate-fade-in">
                          <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                            Namaste! 🙏
                          </h3>
                          <p className="text-foreground text-sm md:text-base leading-relaxed">
                            {displayedText}
                            {isTyping && <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-ping"></span>}
                          </p>
                          {showDots && (
                            <div className="mt-3 flex justify-center gap-1">
                              {[0, 150, 300].map((delay, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                                  style={{ animationDelay: `${delay}ms` }}
                                ></div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!showLargeMuneem && (
              /* Compact Muneem Ji with options */
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                        alt="Muneem Ji"
                        className="h-16 w-12 animate-muneemji-wave transition-all duration-500"
                      />
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 animate-pulse"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        Main aapki kya madad kar sakta hoon?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Choose from the options below to get started
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}


            {showOptions && (
              <div className="p-4 grid grid-cols-2 gap-3">
                {chatOptions.map((option, index) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option)}
                    className="justify-start gap-3 p-3 h-auto text-left border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 w-full"
                    style={{
                      animation: 'mj-pop 0.3s ease-out',
                      animationDelay: `${index * 80}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </Button>
                ))}
              </div>
            )}




            {/* Input */}
            <div className="pt-20  p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" className="px-3 bg-[#C91429] hover:bg-[#b21224]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Popup */}
      <Dialog open={showPopup} onOpenChange={(open) => {
        setShowPopup(open);
        if (!open) {
          setSelectedOption(null);
        }
      }}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {/* <img 
                src={getMuneemjiImage()}
                alt="Muneem Ji"
                className="h-8 w-8 object-contain"
              /> */}
              {/* {selectedOption && chatOptions.find(opt => opt.id === selectedOption)?.label} */}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOption && renderDetailComponent(selectedOption)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MuneemjiChatbot;







































