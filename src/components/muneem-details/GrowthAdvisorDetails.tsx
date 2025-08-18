import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Target, 
  Users, 
  BookOpen, 
  Download, 
  Globe,
  MapPin,
  Zap,
  BarChart3,
  MessageCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';

const GrowthAdvisorDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('local');
  const [showWelcome, setShowWelcome] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [showData, setShowData] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showDots, setShowDots] = useState(false);
  
  const fullText = "Let me help you with some competition analysis of the garment business in global and domestic markets.";

  useEffect(() => {
    // Show welcome for 3 seconds, then start analysis
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setShowDots(true);
      setIsTyping(true);
      
      // Show typing dots for 2 seconds
      const dotsTimer = setTimeout(() => {
        setShowDots(false);
        
        // Type out the text
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setDisplayedText(fullText.slice(0, currentIndex));
            currentIndex++;
          } else {
            setIsTyping(false);
            clearInterval(typingInterval);
            
            // Show tabs and data after typing is complete
            setTimeout(() => {
              setShowData(true);
            }, 1000);
          }
        }, 50);

        return () => clearInterval(typingInterval);
      }, 2000);
    }, 3000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  const businessMetrics = [
    { label: 'Annual Turnover', value: '₹5 Crore' },
    { label: 'Profit Margin', value: '~12%' },
    { label: 'Monthly Orders', value: '2,200 units' },
    { label: 'Market Share', value: '~1.9%' },
    { label: 'Market Size', value: '₹260 Crore' }
  ];

  // Chart data
  const globalMarketData = [
    { country: 'China', share: 32, value: 158 },
    { country: 'Bangladesh', share: 12, value: 60 },
    { country: 'Vietnam', share: 8, value: 40 },
    { country: 'India', share: 6, value: 30 },
    { country: 'Turkey', share: 4, value: 20 },
    { country: 'Others', share: 38, value: 190 }
  ];

  const competitorBenchmark = [
    { metric: 'Quality', punjab: 75, tirupur: 85, bangladesh: 60, ideal: 90 },
    { metric: 'Cost', punjab: 70, tirupur: 80, bangladesh: 95, ideal: 85 },
    { metric: 'Speed', punjab: 65, tirupur: 75, bangladesh: 80, ideal: 90 },
    { metric: 'Innovation', punjab: 60, tirupur: 70, bangladesh: 40, ideal: 85 },
    { metric: 'Sustainability', punjab: 55, tirupur: 65, bangladesh: 30, ideal: 90 },
    { metric: 'Tech Adoption', punjab: 50, tirupur: 75, bangladesh: 45, ideal: 95 }
  ];

  const exportTrends = [
    { year: 'FY21', exports: 2.8, growth: -12 },
    { year: 'FY22', exports: 3.2, growth: 14 },
    { year: 'FY23', exports: 3.6, growth: 12.5 },
    { year: 'FY24', exports: 4.1, growth: 13.9 }
  ];

  const opportunityMatrix = [
    { opportunity: 'Sustainable Fashion', impact: 85, feasibility: 70, size: 120 },
    { opportunity: 'Automation', impact: 75, feasibility: 65, size: 90 },
    { opportunity: 'FTAs', impact: 80, feasibility: 60, size: 100 },
    { opportunity: 'Technical Textiles', impact: 70, feasibility: 55, size: 80 },
    { opportunity: 'E-commerce', impact: 65, feasibility: 80, size: 75 }
  ];

  const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

  const handleExportReport = () => {
    console.log('Exporting growth advisor report...');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      {showWelcome && (
        <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative inline-block">
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                alt="Muneem Ji"
                className="h-32 w-32 animate-pulse"
              />
              <div className="absolute -right-4 top-8 text-4xl animate-bounce">👋</div>
            </div>
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold text-primary mb-2">Welcome to Growth Advisor! 🚀</h2>
              <p className="text-muted-foreground">Let me analyze your business...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Header */}
      {!showWelcome && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <img
                  src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                  alt="Muneem Ji"
                  className={`h-20 w-20 transition-all duration-500 ${
                    isTyping ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white transition-all duration-300 ${
                  isTyping ? 'bg-orange-500 animate-ping' : 'bg-green-500 animate-pulse'
                }`}></div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-xl font-bold">Growth Advisor Analysis</h1>
                  {isTyping && <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>}
                </div>
                
                {showDots && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground animate-pulse">Analyzing market data...</span>
                  </div>
                )}
                
                {!showDots && (
                  <p className="text-sm text-foreground">
                    {displayedText}
                    {isTyping && <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-ping"></span>}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs and Data - Only show after analysis is complete */}
      {showData && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 bg-muted/50 p-1">
            <TabsTrigger value="local" className="flex items-center gap-2 text-xs md:text-sm">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">📍 Local</span>
              <span className="sm:hidden">Local</span>
            </TabsTrigger>
            <TabsTrigger value="global" className="flex items-center gap-2 text-xs md:text-sm">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">🌍 Global</span>
              <span className="sm:hidden">Global</span>
            </TabsTrigger>
            <TabsTrigger value="domestic" className="flex items-center gap-2 text-xs md:text-sm">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">🇮🇳 Domestic</span>
              <span className="sm:hidden">Domestic</span>
            </TabsTrigger>
            <TabsTrigger value="strengths" className="flex items-center gap-2 text-xs md:text-sm">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">💪 Strengths</span>
              <span className="sm:hidden">Strengths</span>
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex items-center gap-2 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">🚀 Growth</span>
              <span className="sm:hidden">Growth</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2 text-xs md:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">📊 Analysis</span>
              <span className="sm:hidden">Analysis</span>
            </TabsTrigger>
          </TabsList>

          {/* Local Competition Tab */}
          <TabsContent value="local" className="space-y-4">
            <div className="grid gap-4">
              <Card className="card-elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    Local Competition Analysis - Punjab Sportswear Pvt. Ltd.
                  </CardTitle>
                  <CardDescription>
                    Your competitive landscape in Ludhiana's sports garment manufacturing sector
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Business Overview */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Your Business Profile</h4>
                      
                      <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/20 border-primary/20">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-semibold text-primary">Punjab Sportswear Pvt. Ltd.</h5>
                            <Badge className="bg-primary text-primary-foreground">Your Business</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Annual Turnover</p>
                              <p className="font-semibold">₹5 Crore</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Profit Margin</p>
                              <p className="font-semibold">~12%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Monthly Orders</p>
                              <p className="font-semibold">2,200 units</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Market Share</p>
                              <p className="font-semibold">~1.9%</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground">📍 Location: Ludhiana, Punjab</p>
                            <p className="text-xs text-muted-foreground">🏭 Industry: Sports & Athletic Wear Manufacturing</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Local Competitors */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Top Local Competitors</h4>
                      
                      <div className="space-y-3">
                        <Card className="p-3 border-orange-200 bg-orange-50">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-orange-800">Elite Sports Manufacturing</h5>
                            <Badge variant="secondary" className="bg-orange-200 text-orange-800">Competitor</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Turnover:</span>
                              <span className="font-semibold ml-1">₹8 Crore</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Market Share:</span>
                              <span className="font-semibold ml-1">~3.1%</span>
                            </div>
                          </div>
                          <p className="text-xs text-orange-700 mt-2">🎯 Strength: Premium quality jerseys, established brand</p>
                        </Card>

                        <Card className="p-3 border-blue-200 bg-blue-50">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-blue-800">Ludhiana Sportswear Co.</h5>
                            <Badge variant="secondary" className="bg-blue-200 text-blue-800">Competitor</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Turnover:</span>
                              <span className="font-semibold ml-1">₹6.5 Crore</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Market Share:</span>
                              <span className="font-semibold ml-1">~2.5%</span>
                            </div>
                          </div>
                          <p className="text-xs text-blue-700 mt-2">🎯 Strength: Cost-effective production, bulk orders</p>
                        </Card>

                        <Card className="p-3 border-green-200 bg-green-50">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-semibold text-green-800">Victory Athletic Wear</h5>
                            <Badge variant="secondary" className="bg-green-200 text-green-800">Competitor</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Turnover:</span>
                              <span className="font-semibold ml-1">₹4.2 Crore</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Market Share:</span>
                              <span className="font-semibold ml-1">~1.6%</span>
                            </div>
                          </div>
                          <p className="text-xs text-green-700 mt-2">🎯 Strength: Quick delivery, customization</p>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Market Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Ludhiana Sports Garment Market Analysis</h4>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-600" />
                            <h5 className="font-semibold text-blue-800">Market Size</h5>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">₹260 Crore</p>
                          <p className="text-sm text-blue-700">Annual market volume in Ludhiana region</p>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <h5 className="font-semibold text-green-800">Growth Rate</h5>
                          </div>
                          <p className="text-2xl font-bold text-green-900">8.5%</p>
                          <p className="text-sm text-green-700">Year-over-year market growth</p>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            <h5 className="font-semibold text-purple-800">Key Players</h5>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">15+</p>
                          <p className="text-sm text-purple-700">Major manufacturers in the region</p>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Competitive Insights */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Competitive Insights & Opportunities</h4>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="p-4 border-amber-200 bg-amber-50">
                        <h5 className="font-semibold text-amber-800 mb-3">🎯 Your Competitive Advantages</h5>
                        <ul className="space-y-2 text-sm text-amber-700">
                          <li>• Established 10+ year market presence</li>
                          <li>• Strong relationships with local suppliers</li>
                          <li>• Competitive pricing with good quality balance</li>
                          <li>• Flexible order sizes (100-5000 units)</li>
                          <li>• Quick turnaround time (7-14 days)</li>
                        </ul>
                      </Card>

                      <Card className="p-4 border-red-200 bg-red-50">
                        <h5 className="font-semibold text-red-800 mb-3">⚠️ Areas for Improvement</h5>
                        <ul className="space-y-2 text-sm text-red-700">
                          <li>• Limited digital marketing presence</li>
                          <li>• Lower brand recognition vs. Elite Sports</li>
                          <li>• No online ordering system</li>
                          <li>• Limited sustainable/eco-friendly options</li>
                          <li>• Smaller scale compared to top competitors</li>
                        </ul>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Global Competition Tab */}
          <TabsContent value="global" className="space-y-4">
            <div className="grid gap-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    Global Sportswear Market Analysis
                  </CardTitle>
                  <CardDescription>
                    Understanding the global competitive landscape for sports garment manufacturing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Global Market Share Chart */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Global Market Share by Country (Sportswear Manufacturing)</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={globalMarketData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip formatter={(value, name) => [
                          name === 'share' ? `${value}%` : `$${value}B`,
                          name === 'share' ? 'Market Share' : 'Market Value'
                        ]} />
                        <Legend />
                        <Bar dataKey="share" fill={colors[0]} name="Market Share %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Global Players */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Major Global Competitors & Manufacturing Hubs</h4>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <Card className="p-4 border-red-200 bg-red-50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-4 bg-red-500 rounded"></div>
                            <h5 className="font-semibold text-red-800">China</h5>
                            <Badge className="bg-red-200 text-red-800">Market Leader</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-red-700">
                            <p><strong>Market Share:</strong> 32% ($158B)</p>
                            <p><strong>Strengths:</strong> Scale, cost efficiency, integrated supply chain</p>
                            <p><strong>Key Players:</strong> Li Ning, Anta Sports, Peak Sport</p>
                            <p><strong>Manufacturing Cost:</strong> $2-4 per unit</p>
                          </div>
                        </Card>

                        <Card className="p-4 border-orange-200 bg-orange-50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-4 bg-orange-500 rounded"></div>
                            <h5 className="font-semibold text-orange-800">Bangladesh</h5>
                            <Badge className="bg-orange-200 text-orange-800">Fast Growing</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-orange-700">
                            <p><strong>Market Share:</strong> 12% ($60B)</p>
                            <p><strong>Strengths:</strong> Low labor costs, growing capacity</p>
                            <p><strong>Key Players:</strong> Square Fashions, DBL Group</p>
                            <p><strong>Manufacturing Cost:</strong> $1.5-3 per unit</p>
                          </div>
                        </Card>
                      </div>

                      <div className="space-y-3">
                        <Card className="p-4 border-blue-200 bg-blue-50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-4 bg-blue-500 rounded"></div>
                            <h5 className="font-semibold text-blue-800">Vietnam</h5>
                            <Badge className="bg-blue-200 text-blue-800">Emerging Hub</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-blue-700">
                            <p><strong>Market Share:</strong> 8% ($40B)</p>
                            <p><strong>Strengths:</strong> Trade agreements, quality improvement</p>
                            <p><strong>Key Players:</strong> Hansae, TAL Group</p>
                            <p><strong>Manufacturing Cost:</strong> $2-5 per unit</p>
                          </div>
                        </Card>

                        <Card className="p-4 border-green-200 bg-green-50">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-4 bg-green-500 rounded"></div>
                            <h5 className="font-semibold text-green-800">India</h5>
                            <Badge className="bg-green-200 text-green-800">Your Market</Badge>
                          </div>
                          <div className="space-y-1 text-sm text-green-700">
                            <p><strong>Market Share:</strong> 6% ($30B)</p>
                            <p><strong>Strengths:</strong> Cotton, skilled workforce, domestic market</p>
                            <p><strong>Key Hubs:</strong> Tirupur, Ludhiana, Bangalore</p>
                            <p><strong>Manufacturing Cost:</strong> $3-7 per unit</p>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* India's Position */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">India's Competitive Position</h4>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-green-800 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Strengths
                          </h5>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• World's largest cotton producer</li>
                            <li>• Skilled textile workforce</li>
                            <li>• Growing domestic market</li>
                            <li>• Government support (PLI schemes)</li>
                            <li>• Established export infrastructure</li>
                          </ul>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-amber-800 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Challenges
                          </h5>
                          <ul className="text-sm text-amber-700 space-y-1">
                            <li>• Higher labor costs vs Bangladesh</li>
                            <li>• Complex regulatory environment</li>
                            <li>• Infrastructure bottlenecks</li>
                            <li>• Technology adoption lag</li>
                            <li>• Scale disadvantage vs China</li>
                          </ul>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-blue-800 flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Opportunities
                          </h5>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Sustainable fashion demand</li>
                            <li>• FTA with key markets</li>
                            <li>• Technical textiles growth</li>
                            <li>• Automation adoption</li>
                            <li>• Brand building potential</li>
                          </ul>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Export Performance */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">India's Textile Export Trends</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={exportTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="exports" fill={colors[0]} name="Exports ($B)" />
                        <Line yAxisId="right" type="monotone" dataKey="growth" stroke={colors[1]} name="Growth Rate %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Domestic Tab */}
          <TabsContent value="domestic" className="space-y-4">
            <div className="grid gap-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    Domestic Competition Analysis - India
                  </CardTitle>
                  <CardDescription>
                    Key manufacturing hubs and competitive dynamics within India
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Manufacturing Hubs Comparison */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Major Indian Manufacturing Hubs Comparison</h4>
                    
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={competitorBenchmark}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Punjab (Your Region)" dataKey="punjab" stroke={colors[0]} fill={colors[0]} fillOpacity={0.3} />
                        <Radar name="Tirupur, Tamil Nadu" dataKey="tirupur" stroke={colors[1]} fill={colors[1]} fillOpacity={0.3} />
                        <Radar name="Bangladesh (Reference)" dataKey="bangladesh" stroke={colors[2]} fill={colors[2]} fillOpacity={0.3} />
                        <Radar name="Industry Ideal" dataKey="ideal" stroke="#666" strokeDasharray="5 5" />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Hub Analysis */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-4 border-blue-200 bg-blue-50">
                      <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Tirupur, Tamil Nadu
                      </h5>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex justify-between">
                          <span>Market Share:</span>
                          <span className="font-semibold">~40% of exports</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Production:</span>
                          <span className="font-semibold">₹50,000+ Crore</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Key Strength:</span>
                          <span className="font-semibold">Knitwear expertise</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">🏆 India's largest knitwear hub, strong export ecosystem</p>
                      </div>
                    </Card>

                    <Card className="p-4 border-green-200 bg-green-50">
                      <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Punjab (Ludhiana) - Your Hub
                      </h5>
                      <div className="space-y-2 text-sm text-green-700">
                        <div className="flex justify-between">
                          <span>Market Share:</span>
                          <span className="font-semibold">~15% of production</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Production:</span>
                          <span className="font-semibold">₹18,000+ Crore</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Key Strength:</span>
                          <span className="font-semibold">Sports garments</span>
                        </div>
                        <p className="text-xs text-green-600 mt-2">🎯 Strong in sportswear, growing export potential</p>
                      </div>
                    </Card>
                  </div>

                  {/* Top Domestic Players */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Leading Domestic Players</h4>
                    
                    <div className="grid gap-3">
                      <Card className="p-4 border-purple-200 bg-purple-50">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold text-purple-800">Arvind Limited</h5>
                          <Badge className="bg-purple-200 text-purple-800">₹8,000+ Cr Revenue</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-purple-700">
                          <div><span className="text-muted-foreground">Base:</span> Ahmedabad</div>
                          <div><span className="text-muted-foreground">Specialty:</span> Denim, Casual</div>
                          <div><span className="text-muted-foreground">Exports:</span> 60+ Countries</div>
                          <div><span className="text-muted-foreground">Capacity:</span> 100M+ units/year</div>
                        </div>
                      </Card>

                      <Card className="p-4 border-indigo-200 bg-indigo-50">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold text-indigo-800">Gokaldas Exports</h5>
                          <Badge className="bg-indigo-200 text-indigo-800">₹2,500+ Cr Revenue</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-indigo-700">
                          <div><span className="text-muted-foreground">Base:</span> Bangalore</div>
                          <div><span className="text-muted-foreground">Specialty:</span> Premium garments</div>
                          <div><span className="text-muted-foreground">Clients:</span> Global brands</div>
                          <div><span className="text-muted-foreground">Focus:</span> Sustainability</div>
                        </div>
                      </Card>

                      <Card className="p-4 border-teal-200 bg-teal-50">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-semibold text-teal-800">KPR Mill Limited</h5>
                          <Badge className="bg-teal-200 text-teal-800">₹6,500+ Cr Revenue</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-teal-700">
                          <div><span className="text-muted-foreground">Base:</span> Coimbatore</div>
                          <div><span className="text-muted-foreground">Specialty:</span> Integrated textiles</div>
                          <div><span className="text-muted-foreground">USP:</span> Yarn to garment</div>
                          <div><span className="text-muted-foreground">Tech:</span> Automated production</div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Market Insights */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Domestic Market Insights</h4>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="p-4 border-emerald-200 bg-emerald-50">
                        <h5 className="font-semibold text-emerald-800 mb-3">🚀 Growth Opportunities</h5>
                        <ul className="space-y-2 text-sm text-emerald-700">
                          <li>• E-commerce boom driving demand</li>
                          <li>• Rising middle class purchasing power</li>
                          <li>• Sports culture growth in India</li>
                          <li>• Government's Make in India push</li>
                          <li>• PLI scheme benefits for textiles</li>
                          <li>• Sustainable fashion trend</li>
                        </ul>
                      </Card>

                      <Card className="p-4 border-rose-200 bg-rose-50">
                        <h5 className="font-semibold text-rose-800 mb-3">⚡ Key Challenges</h5>
                        <ul className="space-y-2 text-sm text-rose-700">
                          <li>• Fragmented market with many small players</li>
                          <li>• Raw material price volatility</li>
                          <li>• Compliance and regulatory complexity</li>
                          <li>• Technology adoption lag</li>
                          <li>• Skilled workforce shortage</li>
                          <li>• Working capital management</li>
                        </ul>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Strengths Tab */}
          <TabsContent value="strengths" className="space-y-4">
            <div className="grid gap-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Your Competitive Strengths & SWOT Analysis
                  </CardTitle>
                  <CardDescription>
                    Comprehensive analysis of Punjab Sportswear's competitive position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* SWOT Matrix */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="p-4 border-green-200 bg-green-50">
                      <h5 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Strengths
                      </h5>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span><strong>Established Market Presence:</strong> 10+ years in sportswear manufacturing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span><strong>Quality-Cost Balance:</strong> Good quality at competitive prices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span><strong>Flexible Production:</strong> Handle 100-5000 unit orders efficiently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span><strong>Quick Turnaround:</strong> 7-14 day delivery timeline</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span><strong>Local Supply Chain:</strong> Strong supplier relationships in Punjab</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span><strong>Skilled Workforce:</strong> Experienced in sports garment techniques</span>
                        </li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-amber-200 bg-amber-50">
                      <h5 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Weaknesses
                      </h5>
                      <ul className="space-y-2 text-sm text-amber-700">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span><strong>Limited Brand Recognition:</strong> Smaller brand compared to Elite Sports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span><strong>Digital Presence:</strong> Minimal online marketing and e-commerce</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span><strong>Scale Limitations:</strong> Production capacity vs larger competitors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span><strong>Technology Gap:</strong> Manual processes vs automated production</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span><strong>Limited R&D:</strong> Less investment in product innovation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">⚠</span>
                          <span><strong>Export Infrastructure:</strong> Limited direct export capabilities</span>
                        </li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-blue-200 bg-blue-50">
                      <h5 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Opportunities
                      </h5>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">→</span>
                          <span><strong>E-commerce Expansion:</strong> Direct-to-consumer online sales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">→</span>
                          <span><strong>Sustainable Fashion:</strong> Eco-friendly sportswear demand growing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">→</span>
                          <span><strong>Government Schemes:</strong> PLI benefits for textile manufacturers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">→</span>
                          <span><strong>Sports Culture:</strong> Rising fitness awareness in India</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">→</span>
                          <span><strong>Export Markets:</strong> FTAs opening new international markets</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">→</span>
                          <span><strong>Technology Adoption:</strong> Automation and digital tools</span>
                        </li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-red-200 bg-red-50">
                      <h5 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Threats
                      </h5>
                      <ul className="space-y-2 text-sm text-red-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">⚡</span>
                          <span><strong>International Competition:</strong> Low-cost imports from Bangladesh</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">⚡</span>
                          <span><strong>Raw Material Costs:</strong> Cotton and synthetic price volatility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">⚡</span>
                          <span><strong>Large Player Dominance:</strong> Bigger companies gaining market share</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">⚡</span>
                          <span><strong>Economic Slowdown:</strong> Reduced consumer spending on apparel</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">⚡</span>
                          <span><strong>Regulatory Changes:</strong> GST, labor law modifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600">⚡</span>
                          <span><strong>Technology Disruption:</strong> 3D printing, on-demand manufacturing</span>
                        </li>
                      </ul>
                    </Card>
                  </div>

                  {/* Core Competencies */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Core Competencies Analysis</h4>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                              <Zap className="h-4 w-4 text-white" />
                            </div>
                            <h5 className="font-semibold text-emerald-800">Production Excellence</h5>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-emerald-700">Quality Control</span>
                              <span className="font-semibold text-emerald-800">85%</span>
                            </div>
                            <div className="w-full bg-emerald-200 rounded-full h-2">
                              <div className="bg-emerald-600 h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-emerald-700">Production Efficiency</span>
                              <span className="font-semibold text-emerald-800">78%</span>
                            </div>
                            <div className="w-full bg-emerald-200 rounded-full h-2">
                              <div className="bg-emerald-600 h-2 rounded-full" style={{width: '78%'}}></div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <h5 className="font-semibold text-blue-800">Customer Relations</h5>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-blue-700">Customer Satisfaction</span>
                              <span className="font-semibold text-blue-800">82%</span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: '82%'}}></div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-blue-700">Repeat Business</span>
                              <span className="font-semibold text-blue-800">75%</span>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                              <Target className="h-4 w-4 text-white" />
                            </div>
                            <h5 className="font-semibold text-purple-800">Market Position</h5>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-700">Local Market Share</span>
                              <span className="font-semibold text-purple-800">1.9%</span>
                            </div>
                            <div className="w-full bg-purple-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{width: '19%'}}></div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-700">Brand Recognition</span>
                              <span className="font-semibold text-purple-800">65%</span>
                            </div>
                            <div className="w-full bg-purple-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Competitive Advantages */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Unique Competitive Advantages</h4>
                    
                    <div className="grid gap-3">
                      <Card className="p-4 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-lg">🏃</span>
                          </div>
                          <div className="flex-1">
                            <h6 className="font-semibold text-green-800">Sports Specialization</h6>
                            <p className="text-sm text-green-700">Unlike generalist manufacturers, you focus specifically on sports and athletic wear, bringing deep expertise in performance fabrics and designs</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-lg">⚡</span>
                          </div>
                          <div className="flex-1">
                            <h6 className="font-semibold text-blue-800">Agile Production</h6>
                            <p className="text-sm text-blue-700">Ability to handle diverse order sizes (100-5000 units) with quick turnaround, making you ideal for both small brands and established retailers</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-lg">🤝</span>
                          </div>
                          <div className="flex-1">
                            <h6 className="font-semibold text-purple-800">Relationship-First Approach</h6>
                            <p className="text-sm text-purple-700">Strong personal relationships with customers and suppliers, providing better service and more flexible terms than larger corporate competitors</p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-lg">💰</span>
                          </div>
                          <div className="flex-1">
                            <h6 className="font-semibold text-orange-800">Value Engineering</h6>
                            <p className="text-sm text-orange-700">Optimal balance between quality and cost, providing better value than premium players and higher quality than budget competitors</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Growth Tab */}
          <TabsContent value="growth" className="space-y-4">
            <div className="grid gap-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Growth Opportunities & Strategic Recommendations
                  </CardTitle>
                  <CardDescription>
                    Data-driven growth strategies tailored for Punjab Sportswear
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Opportunity Matrix */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Strategic Opportunity Matrix</h4>
                    <ResponsiveContainer width="100%" height={400}>
                      <ScatterChart data={opportunityMatrix}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="feasibility" domain={[0, 100]} name="Feasibility" />
                        <YAxis type="number" dataKey="impact" domain={[0, 100]} name="Impact" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-3 border rounded shadow">
                                <p className="font-semibold">{data.opportunity}</p>
                                <p className="text-sm">Impact: {data.impact}%</p>
                                <p className="text-sm">Feasibility: {data.feasibility}%</p>
                                <p className="text-sm">Market Size: ${data.size}M</p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                        <Scatter dataKey="size" fill={colors[0]}>
                          {opportunityMatrix.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                    <p className="text-sm text-muted-foreground">
                      Bubble size represents market opportunity size. Top-right quadrant shows high-impact, high-feasibility opportunities.
                    </p>
                  </div>

                  {/* Priority Growth Strategies */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Priority Growth Strategies</h4>
                    
                    <div className="grid gap-4">
                      {/* High Priority */}
                      <Card className="p-4 border-green-200 bg-green-50">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-green-600 text-white">HIGH PRIORITY</Badge>
                          <h5 className="font-semibold text-green-800">🌱 Sustainable Fashion Line</h5>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-green-700">
                            Launch eco-friendly sportswear using organic cotton and recycled polyester. Market growing at 15% annually.
                          </p>
                          <div className="grid gap-2 md:grid-cols-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Investment:</span>
                              <span className="font-semibold ml-1">₹50L</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <span className="font-semibold ml-1">6-8 months</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ROI Expected:</span>
                              <span className="font-semibold ml-1">25-30%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">Organic Cotton</Badge>
                            <Badge variant="outline" className="text-xs">Recycled Polyester</Badge>
                            <Badge variant="outline" className="text-xs">GOTS Certification</Badge>
                            <Badge variant="outline" className="text-xs">Premium Pricing</Badge>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-blue-200 bg-blue-50">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-blue-600 text-white">HIGH PRIORITY</Badge>
                          <h5 className="font-semibold text-blue-800">🛒 E-commerce Platform</h5>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-blue-700">
                            Direct-to-consumer online sales platform with custom design tools. E-commerce sports apparel growing 20%+ annually.
                          </p>
                          <div className="grid gap-2 md:grid-cols-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Investment:</span>
                              <span className="font-semibold ml-1">₹25L</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <span className="font-semibold ml-1">3-4 months</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ROI Expected:</span>
                              <span className="font-semibold ml-1">35-40%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">Custom Design Tool</Badge>
                            <Badge variant="outline" className="text-xs">B2B Portal</Badge>
                            <Badge variant="outline" className="text-xs">Digital Marketing</Badge>
                            <Badge variant="outline" className="text-xs">Social Commerce</Badge>
                          </div>
                        </div>
                      </Card>

                      {/* Medium Priority */}
                      <Card className="p-4 border-yellow-200 bg-yellow-50">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-yellow-600 text-white">MEDIUM PRIORITY</Badge>
                          <h5 className="font-semibold text-yellow-800">🤖 Production Automation</h5>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-yellow-700">
                            Semi-automated cutting and sewing equipment to improve efficiency and reduce labor costs by 20-25%.
                          </p>
                          <div className="grid gap-2 md:grid-cols-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Investment:</span>
                              <span className="font-semibold ml-1">₹1.2Cr</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <span className="font-semibold ml-1">8-12 months</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ROI Expected:</span>
                              <span className="font-semibold ml-1">22-28%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">Auto Cutting</Badge>
                            <Badge variant="outline" className="text-xs">IoT Monitoring</Badge>
                            <Badge variant="outline" className="text-xs">Quality Control</Badge>
                            <Badge variant="outline" className="text-xs">PLI Benefits</Badge>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-purple-200 bg-purple-50">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-purple-600 text-white">MEDIUM PRIORITY</Badge>
                          <h5 className="font-semibold text-purple-800">🌍 Export Market Entry</h5>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-purple-700">
                            Target Middle East and Southeast Asian markets through trade partnerships and FTA benefits.
                          </p>
                          <div className="grid gap-2 md:grid-cols-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Investment:</span>
                              <span className="font-semibold ml-1">₹75L</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Timeline:</span>
                              <span className="font-semibold ml-1">10-15 months</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">ROI Expected:</span>
                              <span className="font-semibold ml-1">18-25%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">UAE Market</Badge>
                            <Badge variant="outline" className="text-xs">FTA Benefits</Badge>
                            <Badge variant="outline" className="text-xs">Export Credit</Badge>
                            <Badge variant="outline" className="text-xs">Trade Shows</Badge>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Implementation Roadmap */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">12-Month Implementation Roadmap</h4>
                    
                    <div className="grid gap-3">
                      <div className="flex items-center gap-4 p-3 bg-green-50 border-l-4 border-l-green-500">
                        <Badge className="bg-green-100 text-green-800 whitespace-nowrap">Q1 2024</Badge>
                        <div className="flex-1">
                          <h6 className="font-semibold text-green-800">Foundation Phase</h6>
                          <p className="text-sm text-green-700">E-commerce platform development, sustainable material sourcing, digital marketing setup</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-blue-50 border-l-4 border-l-blue-500">
                        <Badge className="bg-blue-100 text-blue-800 whitespace-nowrap">Q2 2024</Badge>
                        <div className="flex-1">
                          <h6 className="font-semibold text-blue-800">Launch Phase</h6>
                          <p className="text-sm text-blue-700">Sustainable line launch, e-commerce go-live, customer acquisition campaigns</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-yellow-50 border-l-4 border-l-yellow-500">
                        <Badge className="bg-yellow-100 text-yellow-800 whitespace-nowrap">Q3 2024</Badge>
                        <div className="flex-1">
                          <h6 className="font-semibold text-yellow-800">Growth Phase</h6>
                          <p className="text-sm text-yellow-700">Automation equipment installation, export market research, partnership development</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-3 bg-purple-50 border-l-4 border-l-purple-500">
                        <Badge className="bg-purple-100 text-purple-800 whitespace-nowrap">Q4 2024</Badge>
                        <div className="flex-1">
                          <h6 className="font-semibold text-purple-800">Scale Phase</h6>
                          <p className="text-sm text-purple-700">International market entry, production optimization, strategic partnerships</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investment & Financing */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Investment Requirements & Financing Options</h4>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="p-4 border-indigo-200 bg-indigo-50">
                        <h5 className="font-semibold text-indigo-800 mb-3">💰 Total Investment Required</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-indigo-700">E-commerce Platform</span>
                            <span className="font-semibold">₹25L</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-indigo-700">Sustainable Line Setup</span>
                            <span className="font-semibold">₹50L</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-indigo-700">Automation Equipment</span>
                            <span className="font-semibold">₹1.2Cr</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-indigo-700">Export Market Entry</span>
                            <span className="font-semibold">₹75L</span>
                          </div>
                          <div className="flex justify-between text-sm border-t pt-2">
                            <span className="text-indigo-800 font-semibold">Total</span>
                            <span className="font-bold text-lg">₹2.7Cr</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-teal-200 bg-teal-50">
                        <h5 className="font-semibold text-teal-800 mb-3">🏦 Financing Options</h5>
                        <div className="space-y-3 text-sm text-teal-700">
                          <div className="p-2 bg-teal-100 rounded">
                            <h6 className="font-semibold text-teal-800">PLI Scheme Benefits</h6>
                            <p>Up to 15% incentive on incremental sales over 5 years</p>
                          </div>
                          <div className="p-2 bg-teal-100 rounded">
                            <h6 className="font-semibold text-teal-800">MSME Loans</h6>
                            <p>Term loans at 8-10% interest, up to ₹2Cr without collateral</p>
                          </div>
                          <div className="p-2 bg-teal-100 rounded">
                            <h6 className="font-semibold text-teal-800">Equipment Financing</h6>
                            <p>Asset-based loans for machinery at competitive rates</p>
                          </div>
                          <div className="p-2 bg-teal-100 rounded">
                            <h6 className="font-semibold text-teal-800">Export Credit</h6>
                            <p>Pre/post shipment finance for export orders</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid gap-4">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    Comprehensive Business Analysis & Benchmarks
                  </CardTitle>
                  <CardDescription>
                    Detailed performance metrics and competitive benchmarking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Financial Performance */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Financial Performance Analysis</h4>
                    
                    <div className="grid gap-4 md:grid-cols-4">
                      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-green-800 text-sm">Annual Revenue</h5>
                          <p className="text-2xl font-bold text-green-900">₹5 Cr</p>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-700">+12% YoY</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-blue-800 text-sm">Profit Margin</h5>
                          <p className="text-2xl font-bold text-blue-900">12%</p>
                          <div className="flex items-center gap-1">
                            <Target className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-700">Above Industry Avg</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-purple-800 text-sm">Monthly Volume</h5>
                          <p className="text-2xl font-bold text-purple-900">2,200</p>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-purple-700">units/month</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <div className="space-y-2">
                          <h5 className="font-semibold text-orange-800 text-sm">Market Share</h5>
                          <p className="text-2xl font-bold text-orange-900">1.9%</p>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-orange-600" />
                            <span className="text-xs text-orange-700">Local Market</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Operational Metrics */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Operational Excellence Metrics</h4>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="p-4">
                        <h5 className="font-semibold mb-3">Production Efficiency</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Capacity Utilization</span>
                              <span className="font-semibold">78%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: '78%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Order Fulfillment Rate</span>
                              <span className="font-semibold">94%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '94%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Quality Pass Rate</span>
                              <span className="font-semibold">91%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: '91%'}}></div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h5 className="font-semibold mb-3">Customer Satisfaction</h5>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Customer Retention</span>
                              <span className="font-semibold">85%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>On-Time Delivery</span>
                              <span className="font-semibold">88%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '88%'}}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Customer Satisfaction</span>
                              <span className="font-semibold">4.2/5</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: '84%'}}></div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Competitive Benchmarking */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Competitive Benchmarking</h4>
                    
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={competitorBenchmark}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Your Company" dataKey="punjab" stroke={colors[0]} fill={colors[0]} fillOpacity={0.3} strokeWidth={2} />
                        <Radar name="Elite Sports Mfg" dataKey="tirupur" stroke={colors[1]} fill={colors[1]} fillOpacity={0.3} strokeWidth={2} />
                        <Radar name="Ludhiana Sports Co" dataKey="bangladesh" stroke={colors[2]} fill={colors[2]} fillOpacity={0.3} strokeWidth={2} />
                        <Radar name="Industry Best Practice" dataKey="ideal" stroke="#666" strokeDasharray="5 5" strokeWidth={1} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Performance Indicators */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Key Performance Indicators (KPIs)</h4>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="p-4 border-emerald-200 bg-emerald-50">
                        <h5 className="font-semibold text-emerald-800 mb-3">🎯 Financial KPIs</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Revenue Growth Rate</span>
                            <Badge className="bg-emerald-200 text-emerald-800">+12%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Gross Margin</span>
                            <Badge className="bg-emerald-200 text-emerald-800">35%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700">EBITDA Margin</span>
                            <Badge className="bg-emerald-200 text-emerald-800">15%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700">Working Capital Cycle</span>
                            <Badge className="bg-emerald-200 text-emerald-800">45 days</Badge>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-blue-200 bg-blue-50">
                        <h5 className="font-semibold text-blue-800 mb-3">⚙️ Operational KPIs</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-blue-700">Average Lead Time</span>
                            <Badge className="bg-blue-200 text-blue-800">10 days</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Order Accuracy</span>
                            <Badge className="bg-blue-200 text-blue-800">96%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Inventory Turnover</span>
                            <Badge className="bg-blue-200 text-blue-800">8.2x</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700">Production Efficiency</span>
                            <Badge className="bg-blue-200 text-blue-800">78%</Badge>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-purple-200 bg-purple-50">
                        <h5 className="font-semibold text-purple-800 mb-3">👥 Customer KPIs</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-700">Customer Lifetime Value</span>
                            <Badge className="bg-purple-200 text-purple-800">₹8.5L</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Repeat Order Rate</span>
                            <Badge className="bg-purple-200 text-purple-800">75%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Average Order Value</span>
                            <Badge className="bg-purple-200 text-purple-800">₹22K</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Customer Acquisition Cost</span>
                            <Badge className="bg-purple-200 text-purple-800">₹3.2K</Badge>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Priority Action Items</h4>
                    
                    <div className="space-y-3">
                      <Card className="p-4 border-l-4 border-l-red-500 bg-red-50">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-red-100 text-red-800">URGENT</Badge>
                          <div className="flex-1">
                            <h6 className="font-semibold text-red-800">Improve Digital Presence</h6>
                            <p className="text-sm text-red-700 mb-2">Current online visibility is limited. E-commerce is critical for growth.</p>
                            <div className="flex gap-2 text-xs">
                              <Badge variant="outline">Website Development</Badge>
                              <Badge variant="outline">Social Media</Badge>
                              <Badge variant="outline">Digital Marketing</Badge>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-l-4 border-l-yellow-500 bg-yellow-50">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-yellow-100 text-yellow-800">HIGH</Badge>
                          <div className="flex-1">
                            <h6 className="font-semibold text-yellow-800">Enhance Quality Control</h6>
                            <p className="text-sm text-yellow-700 mb-2">Quality pass rate at 91% needs improvement to compete with top players.</p>
                            <div className="flex gap-2 text-xs">
                              <Badge variant="outline">Process Standardization</Badge>
                              <Badge variant="outline">Staff Training</Badge>
                              <Badge variant="outline">QC Systems</Badge>
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-50">
                        <div className="flex items-start gap-3">
                          <Badge className="bg-blue-100 text-blue-800">MEDIUM</Badge>
                          <div className="flex-1">
                            <h6 className="font-semibold text-blue-800">Optimize Production Capacity</h6>
                            <p className="text-sm text-blue-700 mb-2">78% capacity utilization indicates room for operational improvement.</p>
                            <div className="flex gap-2 text-xs">
                              <Badge variant="outline">Lean Manufacturing</Badge>
                              <Badge variant="outline">Equipment Upgrade</Badge>
                              <Badge variant="outline">Workflow Optimization</Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Export Report Button */}
      {showData && (
        <div className="flex justify-center pt-6 animate-fade-in">
          <Button onClick={handleExportReport} className="gap-2">
            <Download className="h-4 w-4" />
            Export Detailed Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default GrowthAdvisorDetails;
