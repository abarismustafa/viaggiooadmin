import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ComingSoon.css';

function Aepspayoutcomingsoon() {
  const canvasRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 200;

    class Particle {
      constructor(isBlast) {
        this.x = isBlast ? canvas.width / 2 : Math.random() * canvas.width;
        this.y = isBlast ? canvas.height / 2 : -10;
        this.size = Math.random() * 5 + 2;
        this.speedX = (Math.random() - 0.5) * (isBlast ? 30 : 2);
        this.speedY = isBlast ? (Math.random() - 0.5) * 30 : Math.random() * 3 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;

        // Reset particle when it goes off screen
        if (this.y > canvas.height) {
          this.y = -10;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initial blast
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(true));
    }

    let blastDuration = 0;
    const maxBlastDuration = 30; // 0.5 seconds at 60fps

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove small particles
        if (particle.size <= 0.2) {
          particles.splice(index, 1);
        }
      });

      blastDuration++;

      if (blastDuration >= maxBlastDuration) {
        // Switch to rain effect
        while (particles.length < particleCount) {
          particles.push(new Particle(false));
        }

        // Show content after blast
        if (!showContent) {
          setShowContent(true);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="coming-soon-container">
      <canvas ref={canvasRef} id="celebration-canvas"></canvas>
      <div className={`content contentcomming container ${showContent ? 'show' : ''}`}>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="display-1 fw-bold text-primary mb-4 celebrationh1">Exciting News!</h1>
            <h2 className="display-4 text-secondary mb-4">AEPS Payout is Coming Soon!</h2>
            <div className="lead mb-5 celebrationh2">
              <p>We're excited to announce that our AEPS Payout Commission feature is on its way!</p>
              <p>Get ready for:</p>
              <ul className="list-unstyled">
                <li>Competitive commission rates</li>
                <li>Instant settlements</li>
                <li>User-friendly dashboard</li>
                <li>24/7 customer support</li>
              </ul>
              <p>Stay tuned for the launch and be prepared to maximize your earnings!</p>
            </div>
            {/* <button className="btn btn-primary btn-lg">Notify Me</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aepspayoutcomingsoon;
