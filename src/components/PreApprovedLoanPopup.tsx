import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, CheckCircle, Clock, CreditCard, ArrowRight, Star, Shield } from 'lucide-react';

interface PreApprovedLoanPopupProps {
  onClose: () => void;
}

const PreApprovedLoanPopup: React.FC<PreApprovedLoanPopupProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 20 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const loanOffers = [
    {
      id: 'business-growth',
      title: 'Business Growth Loan',
      amount: 'Up to ₹25 Lakhs',
      rate: 'Starting @ 9.5%',
      features: ['No collateral required', 'Quick approval in 48 hours', 'Flexible repayment'],
      badge: 'Most Popular',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30'
    },
    {
      id: 'working-capital',
      title: 'Working Capital Facility',
      amount: 'Up to ₹50 Lakhs',
      rate: 'Starting @ 8.5%',
      features: ['Line of credit facility', 'Pay interest only on usage', 'Instant access'],
      badge: 'Best Rate',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5">
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button> */}
          
          <DialogHeader className="text-center p-8 pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold">
              🎉 Congratulations! You're Pre-Approved
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              Based on your business profile, we have exclusive loan offers ready for you
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 pb-8">
            {/* Trust Indicators */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure Process</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Quick Approval</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-600" />
                <span>Best Rates</span>
              </div>
            </div>

            {/* Loan Offers */}
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              {loanOffers.map((offer) => (
                <Card key={offer.id} className={`${offer.bgColor} ${offer.borderColor} border-2 hover:shadow-lg transition-all duration-300`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{offer.title}</CardTitle>
                      <Badge variant="secondary" className="bg-white/50">{offer.badge}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">{offer.amount}</div>
                      <div className="text-sm text-muted-foreground">{offer.rate}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" size="sm">
                      Apply Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              <Button size="lg" className="px-8">
                View All Offers
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleClose}>
                Maybe Later
              </Button>
            </div>

            {/* Fine Print */}
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground">
                *Pre-approval subject to final documentation and verification. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreApprovedLoanPopup;