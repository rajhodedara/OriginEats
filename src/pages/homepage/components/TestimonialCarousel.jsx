import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Owner, Spice Junction - Bandra",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_111e29bbe-1763294966477.png",
      imageAlt: "Professional Indian woman with long black hair wearing traditional red kurta smiling warmly at camera",
      content: "OriginEats AI analysis helped me identify the perfect location in Bandra West. Within 6 months, we achieved 120% of the predicted revenue. The competitor insights were game-changing!",
      metrics: { revenue: "₹65L", roi: "180%", timeline: "6 months" }
    },
    {
      name: "Rajesh Patel",
      role: "Founder, Chai & Conversations - Powai",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png",
      imageAlt: "Middle-aged Indian businessman with short black hair and beard wearing navy blue suit with confident smile",
      content: "I was skeptical about AI predictions, but the accuracy was remarkable. The platform identified a market gap for premium cafes in Powai that traditional consultants missed completely.",
      metrics: { revenue: "₹42L", roi: "165%", timeline: "8 months" }
    },
    {
      name: "Meera Desai",
      role: "Co-owner, Mumbai Bites - Colaba",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_103114392-1763294966758.png",
      imageAlt: "Young Indian woman with shoulder-length wavy hair wearing elegant white blouse with professional demeanor",
      content: "The hyper-local insights for Colaba were incredibly detailed. We adjusted our menu pricing based on competitor analysis and saw immediate improvement in margins. Worth every rupee!",
      metrics: { revenue: "₹58L", roi: "195%", timeline: "5 months" }
    }];


  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? testimonials?.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev === testimonials?.length - 1 ? 0 : prev + 1);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Success Stories from Mumbai Restaurateurs
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Real results from real entrepreneurs who trusted our AI insights
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 lg:p-10 shadow-warm-lg">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={currentTestimonial?.image}
                    alt={currentTestimonial?.imageAlt}
                    className="w-full h-full object-cover" />

                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <Icon name="Quote" size={32} className="text-primary/30 mb-4 mx-auto lg:mx-0" />

                <p className="text-base md:text-lg text-foreground mb-6 leading-relaxed italic">
                  "{currentTestimonial?.content}"
                </p>

                <div className="mb-6">
                  <h4 className="text-lg md:text-xl font-semibold text-foreground">
                    {currentTestimonial?.name}
                  </h4>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {currentTestimonial?.role}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                    <div className="text-base md:text-lg font-semibold text-primary">
                      {currentTestimonial?.metrics?.revenue}
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">ROI</div>
                    <div className="text-base md:text-lg font-semibold text-primary">
                      {currentTestimonial?.metrics?.roi}
                    </div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Timeline</div>
                    <div className="text-base md:text-lg font-semibold text-primary">
                      {currentTestimonial?.metrics?.timeline}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                aria-label="Previous testimonial">

                <Icon name="ChevronLeft" size={20} />
              </Button>

              <div className="flex gap-2">
                {testimonials?.map((_, index) =>
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-8' : 'bg-border'}`
                    }
                    aria-label={`Go to testimonial ${index + 1}`} />

                )}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                aria-label="Next testimonial">

                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialCarousel;