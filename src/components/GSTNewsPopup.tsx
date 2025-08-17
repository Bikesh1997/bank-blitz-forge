import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GSTNewsPopupProps {
  onClose: () => void;
}

const GSTNewsPopup: React.FC<GSTNewsPopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in current session
    const hasShownPopup = sessionStorage.getItem('gst-news-popup-shown');
    
    if (!hasShownPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // sessionStorage.setItem('gst-news-popup-shown', 'true');
    onClose();
  };

  const handleReadMore = () => {
    // Open external link to GST news article
    window.open('https://www.business-standard.com/topic/gst-news', '_blank');
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4 rounded-xl border-0 p-0 overflow-hidden">
        <div className="relative bg-gradient-to-br from-primary/5 to-primary/10">
          {/* Header with close button */}
          {/* <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div> */}

          <div className="p-6 pt-12">
            {/* News Icon */}
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                <span className="text-2xl">📰</span>
              </div>
            </div>

            {/* Headline */}
            <DialogHeader className="text-center mb-4">
              <DialogTitle className="text-xl font-bold text-foreground mb-2">
                Latest GST Updates
              </DialogTitle>
            </DialogHeader>

            {/* News Content */}
            <Card className="border-0 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  New GST Compliance Changes for MSMEs
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Important updates on GST filing procedures, tax rates, and compliance requirements that could impact your business operations and savings.
                </p>
                
                {/* Key Points */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Simplified return filing process</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">New tax exemption limits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Updated compliance deadlines</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={handleReadMore}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Full Article
                </Button>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground">
                Stay updated with the latest business news and compliance updates
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GSTNewsPopup;