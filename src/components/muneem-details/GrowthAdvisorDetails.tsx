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
  const [activeTab, setActiveTab] = useState('global');
  const [isTyping, setIsTyping] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [showDots, setShowDots] = useState(true);
  
  const fullText = "Let me help you with some competition analysis of the garment business in global and domestic markets.";

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
      {/* Muneem Ji Speaking Header */}
      <div className="relative">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center gap-8">
              <div className="relative flex-shrink-0">
                <img
                  src={`${process.env.NODE_ENV === 'production' ? '/aditya-birla-finance-limited/' : '/'}generated-image.png`}
                  alt="Muneem Ji"
                  className={`h-32 w-32 rounded-2xl shadow-2xl transition-all duration-500 ${
                    isTyping ? 'scale-105 shadow-primary/20' : 'scale-100'
                  }`}
                  style={{
                    animation: isTyping 
                      ? 'bounce 0.8s infinite alternate, pulse 1.5s infinite' 
                      : 'pulse 3s infinite'
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
                  <h1 className="text-3xl font-bold text-foreground">Growth Advisor Analysis</h1>
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

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 bg-muted/50 p-1">
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

        {/* Global Competitors Tab */}
        <TabsContent value="global" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Bangladesh
                  <Badge className="bg-yellow-100 text-yellow-800">Low Cost Leader</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Low-cost labor advantage</li>
                  <li>• Duty-free EU access</li>
                  <li>• Strong in RMG (T-shirts, trousers)</li>
                  <li>• 12% global market share</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Vietnam
                  <Badge className="bg-blue-100 text-blue-800">Quality Focus</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High quality production</li>
                  <li>• FTAs with EU & US</li>
                  <li>• Efficient supply chains</li>
                  <li>• 8% global market share</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  China
                  <Badge className="bg-red-100 text-red-800">Tech Leader</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Tech-driven automation</li>
                  <li>• Massive scale operations</li>
                  <li>• Advanced textiles leader</li>
                  <li>• 32% global market share</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Turkey
                  <Badge className="bg-green-100 text-green-800">Premium & Speed</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Close to European markets</li>
                  <li>• Premium cotton quality</li>
                  <li>• Fast delivery capabilities</li>
                  <li>• 4% global market share</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Domestic Competitors Tab */}
        <TabsContent value="domestic" className="space-y-4">
          <div className="grid gap-4">
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Tamil Nadu (Tirupur)
                  <Badge className="bg-orange-100 text-orange-800">Knitwear Capital</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Strengths:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Knitwear manufacturing hub</li>
                      <li>• Strong cotton supply chain</li>
                      <li>• Export-oriented infrastructure</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Key Metrics:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• ₹26,000 Cr exports (FY24)</li>
                      <li>• 50% of India's knitwear</li>
                      <li>• 600+ garment units</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Gujarat (Surat)
                  <Badge className="bg-purple-100 text-purple-800">Synthetic Hub</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Strengths:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Leader in synthetics & MMF</li>
                      <li>• Highly automated processes</li>
                      <li>• Strong chemical fiber base</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Key Metrics:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 40% of India's MMF textiles</li>
                      <li>• 200+ integrated units</li>
                      <li>• High automation levels</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="card-elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Maharashtra
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Broad textile ecosystem</li>
                    <li>• Strong export infrastructure</li>
                    <li>• Diverse product range</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Karnataka
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Silk & premium fabrics</li>
                    <li>• Tech-enabled production</li>
                    <li>• Growing export base</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Our Strengths Tab */}
        <TabsContent value="strengths" className="space-y-4">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Punjab/Ludhiana Advantages
              </CardTitle>
              <CardDescription>
                Your competitive positioning in the textile industry
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Wool & Winter Wear Leader</h4>
                      <p className="text-sm text-muted-foreground">Dominant position in wool processing and winter garments manufacturing</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Skilled Labor Force</h4>
                      <p className="text-sm text-muted-foreground">Generations of textile expertise and craftsmanship</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Raw Material Base</h4>
                      <p className="text-sm text-muted-foreground">Strong cotton and natural fiber supply chains</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Mid-Price Positioning</h4>
                      <p className="text-sm text-muted-foreground">Perfect balance between cost and quality</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h5 className="font-semibold text-foreground mb-2">Market Position Summary</h5>
                <p className="text-sm text-muted-foreground">
                  Punjab/Ludhiana holds a unique position in the Indian textile ecosystem with specialized 
                  expertise in wool processing and winter wear. Your region combines traditional craftsmanship 
                  with modern capabilities, making it well-positioned for premium and mid-market segments.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Growth Strategy Tab */}
        <TabsContent value="growth" className="space-y-4">
          <div className="grid gap-4">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Strategic Growth Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      Product Diversification
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>• Sustainable fashion lines</li>
                      <li>• Technical textiles for industrial use</li>
                      <li>• Man-Made Fiber (MMF) products</li>
                      <li>• Smart fabrics and performance wear</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary"></div>
                      Technology & Automation
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>• Automated cutting and sewing</li>
                      <li>• AI-powered quality control</li>
                      <li>• Smart inventory management</li>
                      <li>• Digital pattern making</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Market Expansion
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>• European Union markets</li>
                      <li>• United Kingdom post-Brexit</li>
                      <li>• Middle East & Africa</li>
                      <li>• Southeast Asian countries</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      Infrastructure & Policy
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>• Better logistics infrastructure</li>
                      <li>• Government policy support</li>
                      <li>• Export promotion schemes</li>
                      <li>• Skill development programs</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                  <h5 className="font-semibold text-foreground mb-2">💡 Immediate Action Items</h5>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">3-6 months</div>
                      <div className="text-sm text-muted-foreground">Automation planning</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">6-12 months</div>
                      <div className="text-sm text-muted-foreground">New product lines</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">12+ months</div>
                      <div className="text-sm text-muted-foreground">Market expansion</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Graph Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {/* Global Market Share Chart */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Global Garment Export Market Share
              </CardTitle>
              <CardDescription>Market share by country in billion USD</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={globalMarketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, 'Market Share']}
                    labelFormatter={(label) => `Country: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="share" fill="hsl(var(--primary))" name="Market Share %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Competitor Benchmarking Radar */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Competitor Benchmarking Analysis
              </CardTitle>
              <CardDescription>Performance comparison across key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={competitorBenchmark}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Punjab" dataKey="punjab" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} />
                  <Radar name="Tirupur" dataKey="tirupur" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.1} />
                  <Radar name="Bangladesh" dataKey="bangladesh" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
                  <Radar name="Ideal" dataKey="ideal" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Punjab Export Trends */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Punjab Export Trends
                </CardTitle>
                <CardDescription>Export growth over recent years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={exportTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'exports' ? `$${value}B` : `${value}%`,
                        name === 'exports' ? 'Exports' : 'Growth'
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="exports" stroke="hsl(var(--primary))" name="Exports (USD Billion)" />
                    <Line type="monotone" dataKey="growth" stroke="hsl(var(--secondary))" name="Growth %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Opportunity Matrix */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Opportunity Matrix
                </CardTitle>
                <CardDescription>Impact vs Feasibility analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart data={opportunityMatrix}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="feasibility" 
                      name="Feasibility" 
                      domain={[40, 90]}
                      label={{ value: 'Feasibility', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="impact" 
                      name="Impact" 
                      domain={[60, 90]}
                      label={{ value: 'Impact', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [`${value}`, name]}
                      labelFormatter={() => ''}
                      content={({ active, payload }) => {
                        if (active && payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-lg">
                              <p className="font-semibold">{data.opportunity}</p>
                              <p>Impact: {data.impact}%</p>
                              <p>Feasibility: {data.feasibility}%</p>
                              <p>Market Size: ${data.size}M</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter dataKey="size" fill="hsl(var(--primary))">
                      {opportunityMatrix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Report Button */}
      <Button 
        onClick={handleExportReport}
        className="w-full btn-primary"
        size="lg"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Growth Advisor Report
      </Button>
    </div>
  );
};

export default GrowthAdvisorDetails;