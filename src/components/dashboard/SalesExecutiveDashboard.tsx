import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockKRAs, mockMissions, mockTasks, mockDashboardStats } from '@/data/mockData';
import { 
  Target, 
  Zap, 
  Trophy, 
  Phone, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Gamepad2,
  Calendar,
  MapPin
} from 'lucide-react';

export const SalesExecutiveDashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const activeMissions = mockMissions.filter(m => m.status === 'active');
  const pendingTasks = mockTasks.filter(t => t.status === 'pending' || t.status === 'in_progress');

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const getMissionDifficulty = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      case 'expert': return 'bg-banking-premium text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back! 👋</h1>
        <p className="text-muted-foreground">
          Here's your performance overview and today's missions.
        </p>
      </div>

      {/* XP and Level Card */}
      <Card className="banking-card bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.xp}</div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-banking-gold">Level {stats.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-banking-premium">#{stats.rank}</div>
              <div className="text-sm text-muted-foreground">Team Rank</div>
            </div>
            <div className="text-center">
              <Progress value={75} className="w-full mb-1" />
              <div className="text-sm text-muted-foreground">Next Level: 75%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="banking-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalLeads}</div>
                <div className="text-sm text-muted-foreground">Total Leads</div>
                <div className="text-xs text-success">+12% this month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.convertedLeads}</div>
                <div className="text-sm text-muted-foreground">Converted</div>
                <div className="text-xs text-success">
                  {Math.round((stats.convertedLeads / stats.totalLeads) * 100)}% conversion
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Phone className="h-6 w-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalCalls}</div>
                <div className="text-sm text-muted-foreground">Calls Made</div>
                <div className="text-xs text-warning">8 calls today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-banking-gold/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-banking-gold" />
              </div>
              <div>
                <div className="text-2xl font-bold">₹{(stats.revenue / 100000).toFixed(1)}L</div>
                <div className="text-sm text-muted-foreground">Revenue</div>
                <div className="text-xs text-banking-gold">74% of target</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Missions */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            Today's Missions
            <Badge variant="secondary">{activeMissions.length} active</Badge>
          </CardTitle>
          <CardDescription>
            Complete missions to earn XP and unlock achievements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeMissions.map((mission) => {
            const progressPercentage = (mission.requirements.current / mission.requirements.target) * 100;
            
            return (
              <div key={mission.id} className="mission-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{mission.title}</h4>
                      <Badge className={getMissionDifficulty(mission.difficulty)}>
                        {mission.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        {mission.xpReward} XP
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {mission.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {mission.requirements.current} / {mission.requirements.target}</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button 
                      size="sm" 
                      variant={progressPercentage === 100 ? "default" : "outline"}
                      className={progressPercentage === 100 ? "animate-success" : ""}
                    >
                      {progressPercentage === 100 ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Claim
                        </>
                      ) : (
                        'In Progress'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* KRA Performance & Quick Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KRA Performance */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              KRA Performance
            </CardTitle>
            <CardDescription>
              Your key result areas this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockKRAs.slice(0, 4).map((kra) => {
              const percentage = (kra.achieved / kra.target) * 100;
              
              return (
                <div key={kra.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{kra.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {kra.achieved} / {kra.target} {kra.unit}
                      </div>
                    </div>
                    <Badge 
                      variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                    >
                      {Math.round(percentage)}%
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Tasks */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Pending Tasks
              <Badge variant="destructive">{pendingTasks.length}</Badge>
            </CardTitle>
            <CardDescription>
              Tasks that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className={`p-1 rounded-full ${
                  task.priority === 'urgent' ? 'bg-destructive' :
                  task.priority === 'high' ? 'bg-warning' : 'bg-primary'
                }`}>
                  {task.category === 'call' ? <Phone className="h-3 w-3 text-white" /> :
                   task.category === 'meeting' ? <Calendar className="h-3 w-3 text-white" /> :
                   task.category === 'visit' ? <MapPin className="h-3 w-3 text-white" /> :
                   <Clock className="h-3 w-3 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{task.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    task.status === 'in_progress' ? 'border-warning text-warning' : 
                    'border-muted-foreground'
                  }
                >
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};