import React from 'react';
import type { WeatherVisual } from '../../types/weather';

interface WeatherBackgroundProps {
  visual: WeatherVisual;
}

/* ============================================================
   STARS — DEEP NIGHT SKY
   ============================================================ */

function Stars() {
  const stars = Array.from({ length: 300 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((_, index) => {
        let depth: 'far' | 'mid' | 'near';

        if (index < 160) {
          depth = 'far';
        } else if (index < 260) {
          depth = 'mid';
        } else {
          depth = 'near';
        }

        let size: number;

        if (depth === 'far') {
          size =
            index % 18 === 0
              ? 1.5
              : index % 7 === 0
                ? 1.25
                : 0.8;
        } else if (depth === 'mid') {
          size =
            index % 14 === 0
              ? 2
              : index % 5 === 0
                ? 1.5
                : 1;
        } else {
          size =
            index % 9 === 0
              ? 3
              : index % 4 === 0
                ? 2.2
                : 1.5;
        }

        let opacity: number;

        if (depth === 'far') {
          opacity =
            0.12 +
            ((index * 17) % 28) / 100;
        } else if (depth === 'mid') {
          opacity =
            0.20 +
            ((index * 19) % 38) / 100;
        } else {
          opacity =
            0.30 +
            ((index * 23) % 46) / 100;
        }

        const horizontal =
          (index * 37.71 +
            index * 11.17) %
          100;

        const verticalBase =
          (index * 61.27 +
            index * 7.41) %
          100;

        const vertical =
          depth === 'far'
            ? verticalBase * 0.92
            : depth === 'mid'
              ? verticalBase * 0.95
              : verticalBase;

        const twinkleDuration =
          depth === 'far'
            ? 7 + (index % 8) * 0.9
            : depth === 'mid'
              ? 4.5 + (index % 7) * 0.65
              : 3.0 + (index % 6) * 0.55;

        const twinkleDelay =
          -((index * 1.37) % 12);

        const driftDuration =
          depth === 'far'
            ? 42 + (index % 10) * 4
            : depth === 'mid'
              ? 30 + (index % 9) * 3
              : 22 + (index % 8) * 2.5;

        const driftDelay =
          -((index * 0.83) % 20);

        const isHeroStar =
          index % 31 === 0;

        return (
          <span
            key={index}
            className={`
              night-star
              night-star-${depth}
              ${isHeroStar ? 'night-hero-star' : ''}
              absolute
              rounded-full
              bg-white
            `}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${horizontal}%`,
              top: `${vertical}%`,
              opacity,

              animationDuration:
                `${twinkleDuration}s, ${driftDuration}s`,

              animationDelay:
                `${twinkleDelay}s, ${driftDelay}s`,

              boxShadow: isHeroStar
                ? '0 0 7px rgba(255,255,255,0.22)'
                : depth === 'near'
                  ? '0 0 4px rgba(255,255,255,0.12)'
                  : 'none',
            }}
          />
        );
      })}

      {/* ATMOSPHERIC MICRO PARTICLES */}

      {Array.from({ length: 70 }).map((_, index) => {
        const size =
          index % 6 === 0
            ? 1
            : 0.6;

        return (
          <span
            key={`particle-${index}`}
            className="night-particle absolute rounded-full bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,

              left:
                `${(index * 29.73 + 8) % 100}%`,

              top:
                `${(index * 47.31 + 13) % 100}%`,

              opacity:
                0.025 +
                ((index * 11) % 12) / 100,

              animationDuration:
                `${18 + (index % 9) * 2}s`,

              animationDelay:
                `-${(index % 20) * 0.8}s`,
            }}
          />
        );
      })}

      <style>{`
        .night-star-far {
          animation-name:
            starTwinkleFar,
            starDriftFar;

          animation-timing-function:
            ease-in-out,
            linear;

          animation-iteration-count:
            infinite,
            infinite;

          will-change:
            opacity,
            transform;
        }

        .night-star-mid {
          animation-name:
            starTwinkleMid,
            starDriftMid;

          animation-timing-function:
            ease-in-out,
            linear;

          animation-iteration-count:
            infinite,
            infinite;

          will-change:
            opacity,
            transform;
        }

        .night-star-near {
          animation-name:
            starTwinkleNear,
            starDriftNear;

          animation-timing-function:
            ease-in-out,
            linear;

          animation-iteration-count:
            infinite,
            infinite;

          will-change:
            opacity,
            transform;
        }

        .night-hero-star {
          filter:
            drop-shadow(
              0 0 3px
              rgba(255,255,255,0.22)
            );
        }

        @keyframes starTwinkleFar {
          0%,
          100% {
            opacity: 0.14;
          }

          45% {
            opacity: 0.24;
          }

          65% {
            opacity: 0.17;
          }

          82% {
            opacity: 0.29;
          }
        }

        @keyframes starTwinkleMid {
          0%,
          100% {
            opacity: 0.20;
          }

          35% {
            opacity: 0.42;
          }

          52% {
            opacity: 0.27;
          }

          72% {
            opacity: 0.55;
          }

          88% {
            opacity: 0.24;
          }
        }

        @keyframes starTwinkleNear {
          0%,
          100% {
            opacity: 0.28;
            transform:
              scale(1);
          }

          28% {
            opacity: 0.52;
            transform:
              scale(1.12);
          }

          42% {
            opacity: 0.36;
            transform:
              scale(0.96);
          }

          61% {
            opacity: 0.72;
            transform:
              scale(1.20);
          }

          78% {
            opacity: 0.43;
            transform:
              scale(1.02);
          }
        }

        @keyframes starDriftFar {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(2px, -1px, 0);
          }
        }

        @keyframes starDriftMid {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(-5px, 2px, 0);
          }
        }

        @keyframes starDriftNear {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(7px, -4px, 0);
          }
        }

        .night-particle {
          animation:
            nightParticleDrift
            linear
            infinite;

          will-change:
            transform,
            opacity;
        }

        @keyframes nightParticleDrift {
          0% {
            transform:
              translate3d(-4px, 5px, 0);
            opacity: 0.02;
          }

          35% {
            opacity: 0.08;
          }

          70% {
            opacity: 0.035;
          }

          100% {
            transform:
              translate3d(8px, -8px, 0);
            opacity: 0.02;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .night-star-far,
          .night-star-mid,
          .night-star-near,
          .night-particle {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   SHOOTING STARS
   ============================================================ */

function ShootingStars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      <div
        className="shooting-star shooting-star-one absolute"
        aria-hidden="true"
      >
        <span className="shooting-star-head" />
        <span className="shooting-star-tail" />
      </div>

      <div
        className="shooting-star shooting-star-two absolute"
        aria-hidden="true"
      >
        <span className="shooting-star-head" />
        <span className="shooting-star-tail" />
      </div>

      <style>{`
        .shooting-star {
          width: 3px;
          height: 3px;
          opacity: 0;

          transform:
            rotate(-28deg);

          will-change:
            transform,
            opacity;
        }

        .shooting-star-head {
          position: absolute;
          width: 3px;
          height: 3px;

          border-radius: 999px;

          background:
            rgba(255,255,255,0.95);

          box-shadow:
            0 0 6px
            rgba(255,255,255,0.65);
        }

        .shooting-star-tail {
          position: absolute;

          width: 105px;
          height: 1px;

          top: 1px;
          right: 2px;

          transform-origin:
            right center;

          background:
            linear-gradient(
              to left,
              rgba(255,255,255,0.55),
              rgba(255,255,255,0.18),
              transparent
            );

          filter:
            blur(0.25px);
        }

        .shooting-star-one {
          left: 72%;
          top: 18%;

          animation:
            shootingStarOne
            5s
            linear
            infinite;
        }

        @keyframes shootingStarOne {

          0%,
          72% {
            opacity: 0;

            transform:
              translate3d(
                0,
                0,
                0
              )
              rotate(-28deg)
              scale(0.65);
          }

          73% {
            opacity: 0.85;
          }

          76% {
            opacity: 0.95;

            transform:
              translate3d(
                -145px,
                105px,
                0
              )
              rotate(-28deg)
              scale(1);
          }

          77% {
            opacity: 0;
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                -175px,
                125px,
                0
              )
              rotate(-28deg)
              scale(0.8);
          }
        }

        .shooting-star-two {
          left: 28%;
          top: 28%;

          animation:
            shootingStarTwo
            6s
            linear
            infinite;

          animation-delay:
            -2.5s;
        }

        @keyframes shootingStarTwo {

          0%,
          72% {
            opacity: 0;

            transform:
              translate3d(
                0,
                0,
                0
              )
              rotate(-25deg)
              scale(0.55);
          }

          73% {
            opacity: 0.65;
          }

          76% {
            opacity: 0.8;

            transform:
              translate3d(
                -120px,
                82px,
                0
              )
              rotate(-25deg)
              scale(0.95);
          }

          77% {
            opacity: 0;
          }

          100% {
            opacity: 0;

            transform:
              translate3d(
                -150px,
                105px,
                0
              )
              rotate(-25deg)
              scale(0.7);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shooting-star-one,
          .shooting-star-two {
            animation:
              none !important;

            opacity:
              0 !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   DEEP NIGHT ATMOSPHERIC LAYER
   ============================================================ */

function NightAtmosphere() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none night-sky-depth"
      />

      <div
        className="absolute inset-[-20%] pointer-events-none night-stellar-band"
      />

      <div
        className="absolute inset-[-20%] pointer-events-none night-stellar-band-secondary"
      />

      <div
        className="absolute inset-0 pointer-events-none night-atmospheric-dust"
      />

      <style>{`
        .night-sky-depth {
          background:
            radial-gradient(
              ellipse at 50% 5%,
              rgba(255,255,255,0.045),
              transparent 38%
            ),
            radial-gradient(
              ellipse at 15% 38%,
              rgba(255,255,255,0.018),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 82% 52%,
              rgba(255,255,255,0.014),
              transparent 48%
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.025),
              rgba(8,8,8,0.04) 32%,
              rgba(3,3,3,0.16) 68%,
              rgba(0,0,0,0.46) 100%
            );

          animation:
            nightSkyBreath
            22s
            ease-in-out
            infinite;

          will-change:
            opacity;
        }

        .night-stellar-band {
          background:
            radial-gradient(
              ellipse 58% 13% at 48% 52%,
              rgba(255,255,255,0.027),
              rgba(255,255,255,0.012) 28%,
              transparent 72%
            );

          transform:
            rotate(-17deg);

          filter:
            blur(18px);

          opacity:
            0.72;

          animation:
            stellarBandDrift
            70s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        .night-stellar-band-secondary {
          background:
            radial-gradient(
              ellipse 38% 7% at 54% 48%,
              rgba(255,255,255,0.018),
              transparent 70%
            );

          transform:
            rotate(-17deg);

          filter:
            blur(9px);

          opacity:
            0.75;

          animation:
            stellarBandSecondary
            52s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        .night-atmospheric-dust {
          background:
            radial-gradient(
              circle at 18% 25%,
              rgba(255,255,255,0.012),
              transparent 22%
            ),
            radial-gradient(
              circle at 73% 18%,
              rgba(255,255,255,0.010),
              transparent 20%
            ),
            radial-gradient(
              circle at 42% 72%,
              rgba(255,255,255,0.008),
              transparent 24%
            ),
            radial-gradient(
              circle at 88% 68%,
              rgba(255,255,255,0.009),
              transparent 22%
            );

          filter:
            blur(24px);

          opacity:
            0.65;

          animation:
            atmosphericDust
            32s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        @keyframes nightSkyBreath {

          0%,
          100% {
            opacity:
              0.72;
          }

          50% {
            opacity:
              0.92;
          }
        }

        @keyframes stellarBandDrift {

          0%,
          100% {
            transform:
              translate3d(-2%, 1%, 0)
              rotate(-17deg)
              scale(1);

            opacity:
              0.62;
          }

          50% {
            transform:
              translate3d(3%, -1%, 0)
              rotate(-16deg)
              scale(1.035);

            opacity:
              0.82;
          }
        }

        @keyframes stellarBandSecondary {

          0%,
          100% {
            transform:
              translate3d(2%, -1%, 0)
              rotate(-17deg)
              scale(1);

            opacity:
              0.50;
          }

          50% {
            transform:
              translate3d(-3%, 1%, 0)
              rotate(-16deg)
              scale(1.04);

            opacity:
              0.78;
          }
        }

        @keyframes atmosphericDust {

          0%,
          100% {
            transform:
              translate3d(-1%, 0, 0)
              scale(1);

            opacity:
              0.48;
          }

          50% {
            transform:
              translate3d(1.5%, -1%, 0)
              scale(1.025);

            opacity:
              0.72;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .night-sky-depth,
          .night-stellar-band,
          .night-stellar-band-secondary,
          .night-atmospheric-dust {
            animation:
              none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   STEP 6 — MOONLIGHT SPILL + HORIZON ATMOSPHERE
   ============================================================ */

function MoonlightAtmosphere() {
  return (
    <>
      <div
        className="absolute pointer-events-none night-moonlight-spill"
        style={{
          top: '-8%',
          right: '-8%',
          width: '65%',
          height: '75%',
          background:
            'radial-gradient(ellipse at 72% 18%, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.025) 22%, rgba(255,255,255,0.010) 42%, transparent 72%)',
          filter:
            'blur(24px)',
        }}
      />

      <div
        className="absolute pointer-events-none night-moonlight-field"
        style={{
          top: '0%',
          right: '0%',
          width: '55%',
          height: '58%',
          background:
            'radial-gradient(ellipse at 78% 15%, rgba(255,255,255,0.035), transparent 58%)',
          filter:
            'blur(12px)',
        }}
      />

      <div
        className="absolute left-[-20%] right-[-20%] bottom-[8%] h-[28%] pointer-events-none night-horizon-atmosphere"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.018), transparent 68%)',
          filter:
            'blur(25px)',
        }}
      />

      <div
        className="absolute left-[-15%] right-[-15%] bottom-[15%] h-[12%] pointer-events-none night-horizon-band"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.008), transparent)',
          filter:
            'blur(18px)',
        }}
      />

      <style>{`
        .night-moonlight-spill {
          animation:
            moonlightSpill
            18s
            ease-in-out
            infinite;

          will-change:
            opacity,
            transform;
        }

        @keyframes moonlightSpill {

          0%,
          100% {
            opacity:
              0.62;

            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            opacity:
              0.92;

            transform:
              translate3d(-1%, 1%, 0)
              scale(1.025);
          }
        }

        .night-moonlight-field {
          animation:
            moonlightField
            11s
            ease-in-out
            infinite;

          will-change:
            opacity;
        }

        @keyframes moonlightField {

          0%,
          100% {
            opacity:
              0.55;
          }

          50% {
            opacity:
              0.85;
          }
        }

        .night-horizon-atmosphere {
          animation:
            horizonAtmosphere
            26s
            ease-in-out
            infinite;

          will-change:
            opacity,
            transform;
        }

        @keyframes horizonAtmosphere {

          0%,
          100% {
            opacity:
              0.42;

            transform:
              translate3d(-1%, 0, 0)
              scale(1);
          }

          50% {
            opacity:
              0.68;

            transform:
              translate3d(1%, -1%, 0)
              scale(1.025);
          }
        }

        .night-horizon-band {
          animation:
            horizonBand
            20s
            ease-in-out
            infinite;

          will-change:
            opacity,
            transform;
        }

        @keyframes horizonBand {

          0%,
          100% {
            opacity:
              0.35;

            transform:
              translate3d(-1%, 0, 0);
          }

          50% {
            opacity:
              0.58;

            transform:
              translate3d(1%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .night-moonlight-spill,
          .night-moonlight-field,
          .night-horizon-atmosphere,
          .night-horizon-band {
            animation:
              none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   STEP 7 — DISTANT NIGHT HORIZON
   ============================================================ */

function NightHorizon() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none night-vertical-perspective"
      />

      <div
        className="absolute left-[-15%] right-[-15%] bottom-[-8%] h-[34%] pointer-events-none night-distant-horizon"
      />

      <div
        className="absolute left-[-20%] right-[-20%] bottom-[2%] h-[22%] pointer-events-none night-low-atmosphere"
      />

      <div
        className="absolute left-[-30%] right-[-30%] bottom-[7%] h-[8%] pointer-events-none night-horizon-motion"
      />

      <style>{`
        .night-vertical-perspective {
          background:
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.010),
              transparent 24%,
              transparent 55%,
              rgba(0,0,0,0.025) 78%,
              rgba(0,0,0,0.085) 100%
            );

          opacity:
            0.72;

          animation:
            nightPerspective
            28s
            ease-in-out
            infinite;

          will-change:
            opacity;
        }

        .night-distant-horizon {
          background:
            radial-gradient(
              ellipse 72% 36% at 50% 100%,
              rgba(255,255,255,0.020),
              rgba(255,255,255,0.009) 30%,
              transparent 72%
            );

          filter:
            blur(26px);

          opacity:
            0.58;

          animation:
            distantHorizon
            24s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        .night-low-atmosphere {
          background:
            linear-gradient(
              to bottom,
              transparent,
              rgba(255,255,255,0.006) 40%,
              rgba(255,255,255,0.012) 72%,
              rgba(255,255,255,0.018) 100%
            );

          filter:
            blur(16px);

          opacity:
            0.62;

          animation:
            lowAtmosphere
            31s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        .night-horizon-motion {
          background:
            radial-gradient(
              ellipse 50% 100% at 50% 50%,
              rgba(255,255,255,0.010),
              transparent 72%
            );

          filter:
            blur(12px);

          opacity:
            0.48;

          animation:
            horizonMotion
            19s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        @keyframes nightPerspective {

          0%,
          100% {
            opacity:
              0.64;
          }

          50% {
            opacity:
              0.82;
          }
        }

        @keyframes distantHorizon {

          0%,
          100% {
            transform:
              translate3d(-1.5%, 0, 0)
              scale(1);

            opacity:
              0.46;
          }

          50% {
            transform:
              translate3d(1.5%, -1%, 0)
              scale(1.025);

            opacity:
              0.70;
          }
        }

        @keyframes lowAtmosphere {

          0%,
          100% {
            transform:
              translate3d(1%, 0, 0)
              scale(1);

            opacity:
              0.50;
          }

          50% {
            transform:
              translate3d(-1.5%, -0.5%, 0)
              scale(1.02);

            opacity:
              0.72;
          }
        }

        @keyframes horizonMotion {

          0%,
          100% {
            transform:
              translate3d(-2%, 0, 0);

            opacity:
              0.34;
          }

          50% {
            transform:
              translate3d(2%, 0, 0);

            opacity:
              0.56;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .night-vertical-perspective,
          .night-distant-horizon,
          .night-low-atmosphere,
          .night-horizon-motion {
            animation:
              none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   MOON — ATMOSPHERIC
   ============================================================ */

function Moon() {
  return (
    <div
      className="absolute pointer-events-none night-moon"
      style={{
        top: '5%',
        right: '7%',
        width: 'clamp(100px, 12vw, 165px)',
        height: 'clamp(100px, 12vw, 165px)',
      }}
    >
      <div
        className="absolute inset-[-85%] rounded-full night-moon-atmosphere"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.035) 22%, rgba(255,255,255,0.015) 42%, transparent 72%)',
        }}
      />

      <div
        className="absolute inset-[-55%] rounded-full night-moon-halo"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.050) 28%, rgba(255,255,255,0.015) 48%, transparent 72%)',
        }}
      />

      <div
        className="absolute inset-0 rounded-full border border-white/10 night-moon-rim"
        style={{
          boxShadow:
            '0 0 70px rgba(255,255,255,0.075)',
        }}
      />

      <div
        className="absolute inset-[13%] rounded-full night-moon-body"
        style={{
          background:
            'radial-gradient(circle at 36% 32%, #f2f2ed 0%, #d9d9d3 45%, #aaa9a2 76%, #74746f 100%)',

          boxShadow:
            '0 0 42px rgba(255,255,255,0.13), inset -17px -14px 28px rgba(0,0,0,0.30)',
        }}
      />

      <span
        className="absolute rounded-full bg-black/10"
        style={{
          width: '13%',
          height: '13%',
          top: '30%',
          left: '33%',
        }}
      />

      <span
        className="absolute rounded-full bg-black/10"
        style={{
          width: '9%',
          height: '9%',
          top: '48%',
          left: '55%',
        }}
      />

      <span
        className="absolute rounded-full bg-black/10"
        style={{
          width: '16%',
          height: '16%',
          top: '56%',
          left: '39%',
        }}
      />

      <span
        className="absolute rounded-full bg-black/10"
        style={{
          width: '8%',
          height: '8%',
          top: '23%',
          left: '57%',
        }}
      />

      <style>{`
        .night-moon {
          animation:
            moonFloat
            18s
            ease-in-out
            infinite;
        }

        .night-moon-atmosphere {
          animation:
            moonAtmosphere
            9s
            ease-in-out
            infinite;
        }

        .night-moon-halo {
          animation:
            moonHalo
            7s
            ease-in-out
            infinite;
        }

        .night-moon-rim {
          animation:
            moonRim
            8s
            ease-in-out
            infinite;
        }

        .night-moon-body {
          animation:
            moonBody
            8s
            ease-in-out
            infinite;
        }

        @keyframes moonFloat {

          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(-4px, 3px, 0);
          }
        }

        @keyframes moonAtmosphere {

          0%,
          100% {
            opacity: 0.55;
            transform:
              scale(0.97);
          }

          50% {
            opacity: 0.82;
            transform:
              scale(1.035);
          }
        }

        @keyframes moonHalo {

          0%,
          100% {
            opacity: 0.65;
            transform:
              scale(0.98);
          }

          50% {
            opacity: 1;
            transform:
              scale(1.045);
          }
        }

        @keyframes moonRim {

          0%,
          100% {
            box-shadow:
              0 0 55px
              rgba(255,255,255,0.055);
          }

          50% {
            box-shadow:
              0 0 78px
              rgba(255,255,255,0.095);
          }
        }

        @keyframes moonBody {

          0%,
          100% {
            filter:
              brightness(0.96);
          }

          50% {
            filter:
              brightness(1.035);
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .night-moon,
          .night-moon-atmosphere,
          .night-moon-halo,
          .night-moon-rim,
          .night-moon-body {
            animation:
              none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   SUN
   ============================================================ */

function Sun() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '0%',
        right: '2%',
        width: 'clamp(150px, 20vw, 280px)',
        height: 'clamp(150px, 20vw, 280px)',
      }}
    >
      <div
        className="absolute inset-[-30%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.055) 25%, rgba(255,255,255,0.02) 48%, transparent 72%)',
        }}
      />

      <div
        className="absolute inset-[5%] rounded-full"
        style={{
          background:
            'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.055) 0deg 1.5deg, transparent 1.5deg 12deg)',
          maskImage:
            'radial-gradient(circle, transparent 0%, black 42%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 0%, black 42%, transparent 72%)',
        }}
      />

      <div
        className="absolute inset-[25%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.24), rgba(255,255,255,0.055) 55%, transparent 75%)',
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: '30%',
          height: '30%',
          top: '35%',
          left: '35%',
          background:
            'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.38) 55%, rgba(255,255,255,0.08) 100%)',
          boxShadow:
            '0 0 45px rgba(255,255,255,0.15)',
        }}
      />
    </div>
  );
}

/* ============================================================
   ORIGINAL CLOUD
   — Used unchanged by DRIZZLE / RAINY / THUNDERSTORM
   ============================================================ */

function Cloud({
  top,
  left,
  right,
  scale = 1,
  opacity = 0.15,
}: {
  top: string;
  left?: string;
  right?: string;
  scale?: number;
  opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        right,
        width: `${430 * scale}px`,
        height: `${155 * scale}px`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin:
          left !== undefined
            ? 'left center'
            : 'right center',
        filter:
          'blur(1.5px)',
      }}
    >
      <div
        className="absolute bottom-0 left-0 rounded-full bg-white/20"
        style={{
          width: 290,
          height: 52,
        }}
      />

      <div
        className="absolute bottom-0 left-24 rounded-full bg-white/20"
        style={{
          width: 190,
          height: 92,
        }}
      />

      <div
        className="absolute bottom-0 left-48 rounded-full bg-white/15"
        style={{
          width: 150,
          height: 68,
        }}
      />

      <div
        className="absolute bottom-0 left-12 rounded-full bg-white/12"
        style={{
          width: 150,
          height: 65,
        }}
      />

      <div
        className="absolute bottom-2 left-72 rounded-full bg-white/10"
        style={{
          width: 120,
          height: 48,
        }}
      />
    </div>
  );
}

/* ============================================================
   ORIGINAL CLOUD FIELD
   — DO NOT TOUCH
   ============================================================ */

function Clouds({
  storm = false,
}: {
  storm?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <Cloud
        top={storm ? '5%' : '10%'}
        left="-12%"
        scale={storm ? 1.45 : 1.15}
        opacity={storm ? 0.28 : 0.18}
      />

      <Cloud
        top={storm ? '15%' : '22%'}
        right="-15%"
        scale={storm ? 1.55 : 1.35}
        opacity={storm ? 0.27 : 0.17}
      />

      <Cloud
        top={storm ? '31%' : '40%'}
        left="8%"
        scale={storm ? 1.05 : 0.85}
        opacity={storm ? 0.14 : 0.09}
      />

      <Cloud
        top={storm ? '43%' : '52%'}
        right="5%"
        scale={storm ? 0.95 : 0.75}
        opacity={storm ? 0.13 : 0.075}
      />

      {storm && (
        <>
          <Cloud
            top="57%"
            left="-8%"
            scale={1.2}
            opacity={0.11}
          />

          <Cloud
            top="69%"
            right="-10%"
            scale={1.0}
            opacity={0.09}
          />
        </>
      )}
    </div>
  );
}

/* ============================================================
   ENHANCED CLOUDY-ONLY SYSTEM
   ============================================================ */

function EnhancedCloudy() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ======================================================
          OVERCAST SKY DEPTH
          ====================================================== */}

      <div className="absolute inset-0 cloudy-overcast-depth" />

      {/* ======================================================
          FAR CLOUD BANK
          ====================================================== */}

      <div
        className="cloudy-bank cloudy-bank-far"
        style={{
          top: '-8%',
          left: '-18%',
          width: '82%',
          height: '27%',
          animationDelay: '-19s',
        }}
      >
        <div className="cloudy-bank-core" />
        <div className="cloudy-puff cloudy-puff-a" />
        <div className="cloudy-puff cloudy-puff-b" />
        <div className="cloudy-puff cloudy-puff-c" />
      </div>

      <div
        className="cloudy-bank cloudy-bank-far cloudy-bank-right"
        style={{
          top: '-2%',
          right: '-20%',
          width: '84%',
          height: '29%',
          animationDelay: '-43s',
        }}
      >
        <div className="cloudy-bank-core" />
        <div className="cloudy-puff cloudy-puff-a" />
        <div className="cloudy-puff cloudy-puff-b" />
        <div className="cloudy-puff cloudy-puff-c" />
      </div>

      {/* ======================================================
          MID CLOUD BANKS
          ====================================================== */}

      <div
        className="cloudy-bank cloudy-bank-mid"
        style={{
          top: '16%',
          left: '-15%',
          width: '76%',
          height: '29%',
          animationDelay: '-11s',
        }}
      >
        <div className="cloudy-bank-core" />
        <div className="cloudy-puff cloudy-puff-a" />
        <div className="cloudy-puff cloudy-puff-b" />
        <div className="cloudy-puff cloudy-puff-c" />
      </div>

      <div
        className="cloudy-bank cloudy-bank-mid cloudy-bank-right"
        style={{
          top: '24%',
          right: '-17%',
          width: '78%',
          height: '30%',
          animationDelay: '-32s',
        }}
      >
        <div className="cloudy-bank-core" />
        <div className="cloudy-puff cloudy-puff-a" />
        <div className="cloudy-puff cloudy-puff-b" />
        <div className="cloudy-puff cloudy-puff-c" />
      </div>

      {/* ======================================================
          NEAR CLOUD BANKS
          ====================================================== */}

      <div
        className="cloudy-bank cloudy-bank-near"
        style={{
          top: '35%',
          left: '-21%',
          width: '75%',
          height: '31%',
          animationDelay: '-24s',
        }}
      >
        <div className="cloudy-bank-core" />
        <div className="cloudy-puff cloudy-puff-a" />
        <div className="cloudy-puff cloudy-puff-b" />
        <div className="cloudy-puff cloudy-puff-c" />
      </div>

      <div
        className="cloudy-bank cloudy-bank-near cloudy-bank-right"
        style={{
          top: '45%',
          right: '-19%',
          width: '78%',
          height: '30%',
          animationDelay: '-48s',
        }}
      >
        <div className="cloudy-bank-core" />
        <div className="cloudy-puff cloudy-puff-a" />
        <div className="cloudy-puff cloudy-puff-b" />
        <div className="cloudy-puff cloudy-puff-c" />
      </div>

      {/* ======================================================
          LOW CLOUD CEILING
          ====================================================== */}

      <div className="cloudy-low-ceiling" />

      {/* ======================================================
          MOVING CLOUD SHADOW
          ====================================================== */}

      <div className="cloudy-shadow-band" />

      {/* ======================================================
          HORIZON ATMOSPHERE
          ====================================================== */}

      <div className="cloudy-horizon" />

      <style>{`
        /* =====================================================
           OVERCAST DEPTH
           ===================================================== */

        .cloudy-overcast-depth {
          background:
            radial-gradient(
              ellipse at 12% 8%,
              rgba(255,255,255,0.050),
              transparent 34%
            ),
            radial-gradient(
              ellipse at 48% 5%,
              rgba(255,255,255,0.038),
              transparent 40%
            ),
            radial-gradient(
              ellipse at 88% 10%,
              rgba(255,255,255,0.045),
              transparent 35%
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.028),
              rgba(255,255,255,0.012) 38%,
              rgba(0,0,0,0.035) 70%,
              rgba(0,0,0,0.090) 100%
            );

          filter:
            blur(15px);

          opacity:
            0.86;

          animation:
            cloudySkyBreath
            24s
            ease-in-out
            infinite;

          will-change:
            opacity;
        }

        /* =====================================================
           CLOUD BANK
           ===================================================== */

        .cloudy-bank {
          position: absolute;

          pointer-events: none;

          will-change:
            transform,
            opacity;

          animation:
            cloudyFarDrift
            72s
            ease-in-out
            infinite;
        }

        .cloudy-bank-far {
          filter:
            blur(3px);

          animation-duration:
            72s;
        }

        .cloudy-bank-mid {
          filter:
            blur(2px);

          animation-name:
            cloudyMidDrift;

          animation-duration:
            49s;
        }

        .cloudy-bank-near {
          filter:
            blur(1.35px);

          animation-name:
            cloudyNearDrift;

          animation-duration:
            36s;
        }

        .cloudy-bank-right {
          animation-name:
            cloudyFarDriftRight;
        }

        .cloudy-bank-mid.cloudy-bank-right {
          animation-name:
            cloudyMidDriftRight;
        }

        .cloudy-bank-near.cloudy-bank-right {
          animation-name:
            cloudyNearDriftRight;
        }

        /* =====================================================
           MAIN CLOUD MASS
           ===================================================== */

        .cloudy-bank-core {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 59%;

          border-radius:
            999px 999px 35px 35px;

          background:
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.105),
              rgba(255,255,255,0.073) 40%,
              rgba(255,255,255,0.038) 70%,
              rgba(0,0,0,0.025)
            );

          box-shadow:
            inset 0 -18px 32px
            rgba(0,0,0,0.060);
        }

        /* =====================================================
           CLOUD PUFFS
           ===================================================== */

        .cloudy-puff {
          position: absolute;

          border-radius:
            999px;

          background:
            rgba(255,255,255,0.082);

          filter:
            blur(1px);
        }

        .cloudy-puff-a {
          left: 8%;
          bottom: 9%;

          width: 44%;
          height: 77%;
        }

        .cloudy-puff-b {
          left: 38%;
          bottom: 15%;

          width: 38%;
          height: 68%;
        }

        .cloudy-puff-c {
          right: 8%;
          bottom: 4%;

          width: 39%;
          height: 60%;
        }

        /* =====================================================
           FAR MOVEMENT
           ===================================================== */

        @keyframes cloudyFarDrift {

          0%,
          100% {
            transform:
              translate3d(-2vw, 0, 0)
              scale(1);

            opacity:
              0.74;
          }

          50% {
            transform:
              translate3d(3.5vw, 1vh, 0)
              scale(1.025);

            opacity:
              0.96;
          }
        }

        @keyframes cloudyFarDriftRight {

          0%,
          100% {
            transform:
              translate3d(2vw, 0, 0)
              scale(1);

            opacity:
              0.72;
          }

          50% {
            transform:
              translate3d(-3.5vw, 1vh, 0)
              scale(1.025);

            opacity:
              0.94;
          }
        }

        /* =====================================================
           MID MOVEMENT
           ===================================================== */

        @keyframes cloudyMidDrift {

          0%,
          100% {
            transform:
              translate3d(-3vw, 0, 0)
              scale(1);

            opacity:
              0.70;
          }

          50% {
            transform:
              translate3d(5.5vw, 1.5vh, 0)
              scale(1.035);

            opacity:
              0.96;
          }
        }

        @keyframes cloudyMidDriftRight {

          0%,
          100% {
            transform:
              translate3d(3vw, 0, 0)
              scale(1);

            opacity:
              0.70;
          }

          50% {
            transform:
              translate3d(-5.5vw, 1.5vh, 0)
              scale(1.035);

            opacity:
              0.96;
          }
        }

        /* =====================================================
           NEAR MOVEMENT
           ===================================================== */

        @keyframes cloudyNearDrift {

          0%,
          100% {
            transform:
              translate3d(-4vw, 0, 0)
              scale(1);

            opacity:
              0.66;
          }

          50% {
            transform:
              translate3d(7vw, 2vh, 0)
              scale(1.045);

            opacity:
              0.94;
          }
        }

        @keyframes cloudyNearDriftRight {

          0%,
          100% {
            transform:
              translate3d(4vw, 0, 0)
              scale(1);

            opacity:
              0.66;
          }

          50% {
            transform:
              translate3d(-7vw, 2vh, 0)
              scale(1.045);

            opacity:
              0.94;
          }
        }

        /* =====================================================
           LOW CLOUD CEILING
           ===================================================== */

        .cloudy-low-ceiling {
          position: absolute;

          left: -20%;
          right: -20%;
          bottom: -6%;

          height: 31%;

          background:
            linear-gradient(
              to top,
              rgba(0,0,0,0.13),
              rgba(0,0,0,0.050) 42%,
              transparent
            ),
            radial-gradient(
              ellipse at 50% 100%,
              rgba(255,255,255,0.025),
              transparent 70%
            );

          filter:
            blur(21px);

          opacity:
            0.72;

          animation:
            cloudyCeiling
            31s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        @keyframes cloudyCeiling {

          0%,
          100% {
            transform:
              translate3d(1%, 0, 0);

            opacity:
              0.60;
          }

          50% {
            transform:
              translate3d(-1.5%, -1%, 0);

            opacity:
              0.84;
          }
        }

        /* =====================================================
           MOVING CLOUD SHADOW
           ===================================================== */

        .cloudy-shadow-band {
          position: absolute;

          left: -30%;
          right: -30%;

          top: 35%;

          height: 34%;

          background:
            linear-gradient(
              to right,
              transparent,
              rgba(0,0,0,0.030),
              transparent
            );

          filter:
            blur(30px);

          opacity:
            0.42;

          animation:
            cloudyShadow
            43s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        @keyframes cloudyShadow {

          0%,
          100% {
            transform:
              translate3d(-3%, 0, 0);

            opacity:
              0.27;
          }

          50% {
            transform:
              translate3d(3%, 1%, 0);

            opacity:
              0.56;
          }
        }

        /* =====================================================
           HORIZON ATMOSPHERE
           ===================================================== */

        .cloudy-horizon {
          position: absolute;

          left: -20%;
          right: -20%;

          bottom: 2%;

          height: 23%;

          background:
            radial-gradient(
              ellipse at 50% 100%,
              rgba(255,255,255,0.030),
              rgba(255,255,255,0.010) 42%,
              transparent 74%
            );

          filter:
            blur(25px);

          opacity:
            0.64;

          animation:
            cloudyHorizon
            27s
            ease-in-out
            infinite;

          will-change:
            transform,
            opacity;
        }

        @keyframes cloudyHorizon {

          0%,
          100% {
            transform:
              translate3d(-1%, 0, 0);

            opacity:
              0.50;
          }

          50% {
            transform:
              translate3d(1%, -0.5%, 0);

            opacity:
              0.78;
          }
        }

        /* =====================================================
           SKY BREATHING
           ===================================================== */

        @keyframes cloudySkyBreath {

          0%,
          100% {
            opacity:
              0.74;
          }

          50% {
            opacity:
              0.92;
          }
        }

        /* =====================================================
           REDUCED MOTION
           ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .cloudy-overcast-depth,
          .cloudy-bank,
          .cloudy-low-ceiling,
          .cloudy-shadow-band,
          .cloudy-horizon {
            animation:
              none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   DRIZZLE
   ============================================================ */

function Drizzle() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 180 }).map((_, index) => {
          const duration =
            1.15 + (index % 9) * 0.14;

          const delay =
            -((index % 30) * 0.13);

          return (
            <span
              key={index}
              className="weather-drizzle-drop absolute block bg-white"
              style={{
                width:
                  index % 12 === 0
                    ? '2px'
                    : '1px',

                height:
                  `${8 + (index % 6) * 3}px`,

                left:
                  `${(index * 17.37) % 100}%`,

                top:
                  `${-15 + ((index * 29) % 115)}%`,

                opacity:
                  0.16 + (index % 5) * 0.025,

                transform:
                  'rotate(11deg)',

                animation:
                  `weatherDrizzle ${duration}s linear infinite`,

                animationDelay:
                  `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes weatherDrizzle {
          0% {
            transform:
              translate3d(0, -15vh, 0)
              rotate(11deg);
            opacity: 0;
          }

          15% {
            opacity: 0.42;
          }

          80% {
            opacity: 0.22;
          }

          100% {
            transform:
              translate3d(-28px, 120vh, 0)
              rotate(11deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .weather-drizzle-drop {
            animation:
              none !important;

            opacity:
              0.12 !important;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   HEAVY RAIN
   ============================================================ */

function Rain() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 180 }).map((_, index) => {
          const duration =
            1.0 + (index % 9) * 0.12;

          const delay =
            -((index % 30) * 0.11);

          return (
            <span
              key={index}
              className="weather-rain-background absolute block bg-white"
              style={{
                width: '1px',
                height:
                  `${15 + (index % 7) * 5}px`,
                left:
                  `${(index * 13.71) % 100}%`,
                top:
                  `${-20 + ((index * 23) % 120)}%`,
                opacity:
                  0.16 + (index % 5) * 0.025,
                transform:
                  'rotate(14deg)',
                animation:
                  `weatherRainBackground ${duration}s linear infinite`,
                animationDelay:
                  `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 260 }).map((_, index) => {
          const duration =
            0.55 + (index % 8) * 0.075;

          const delay =
            -((index % 40) * 0.075);

          return (
            <span
              key={index}
              className="weather-rain-main absolute block bg-white"
              style={{
                width:
                  index % 8 === 0
                    ? '2px'
                    : '1px',

                height:
                  `${18 + (index % 9) * 6}px`,

                left:
                  `${(index * 17.13) % 100}%`,

                top:
                  `${-25 + ((index * 29.17) % 125)}%`,

                opacity:
                  0.28 + (index % 6) * 0.035,

                transform:
                  'rotate(15deg)',

                animation:
                  `weatherRainMain ${duration}s linear infinite`,

                animationDelay:
                  `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, index) => {
          const duration =
            0.38 + (index % 6) * 0.065;

          const delay =
            -((index % 20) * 0.09);

          return (
            <span
              key={index}
              className="weather-rain-foreground absolute block bg-white"
              style={{
                width:
                  index % 5 === 0
                    ? '2px'
                    : '1px',

                height:
                  `${28 + (index % 8) * 7}px`,

                left:
                  `${(index * 21.37) % 100}%`,

                top:
                  `${-30 + ((index * 37) % 120)}%`,

                opacity:
                  0.38 + (index % 5) * 0.045,

                transform:
                  'rotate(16deg)',

                animation:
                  `weatherRainForeground ${duration}s linear infinite`,

                animationDelay:
                  `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes weatherRainBackground {
          0% {
            transform:
              translate3d(0, -20vh, 0)
              rotate(14deg);
          }

          100% {
            transform:
              translate3d(-35px, 125vh, 0)
              rotate(14deg);
          }
        }

        @keyframes weatherRainMain {
          0% {
            transform:
              translate3d(0, -20vh, 0)
              rotate(15deg);
            opacity: 0;
          }

          8% {
            opacity: 0.65;
          }

          85% {
            opacity: 0.42;
          }

          100% {
            transform:
              translate3d(-48px, 125vh, 0)
              rotate(15deg);
            opacity: 0;
          }
        }

        @keyframes weatherRainForeground {
          0% {
            transform:
              translate3d(0, -30vh, 0)
              rotate(16deg);
            opacity: 0;
          }

          10% {
            opacity: 0.8;
          }

          80% {
            opacity: 0.55;
          }

          100% {
            transform:
              translate3d(-60px, 130vh, 0)
              rotate(16deg);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .weather-rain-background,
          .weather-rain-main,
          .weather-rain-foreground {
            animation:
              none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   THUNDERSTORM LIGHTNING
   ============================================================ */

function Lightning() {
  return (
    <>
      <div className="storm-ambient-glow absolute inset-0 pointer-events-none" />

      <div className="storm-sky-flash absolute inset-0 pointer-events-none" />

      <div className="storm-secondary-flash absolute inset-0 pointer-events-none" />

      <div className="storm-horizon-flash absolute inset-x-0 top-[12%] h-[45%] pointer-events-none" />

      <svg
        className="storm-bolt storm-bolt-one absolute pointer-events-none"
        viewBox="0 0 300 650"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points="170,0 128,155 153,145 96,330 122,315 50,650"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <polyline
          points="170,0 128,155 153,145 96,330 122,315 50,650"
          fill="none"
          stroke="white"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.14"
        />
      </svg>

      <svg
        className="storm-bolt storm-bolt-two absolute pointer-events-none"
        viewBox="0 0 300 650"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points="210,0 177,130 194,120 140,275 164,260 105,490"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <polyline
          points="210,0 177,130 194,120 140,275 164,260 105,490"
          fill="none"
          stroke="white"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.13"
        />
      </svg>

      <style>{`
        .storm-ambient-glow {
          background:
            radial-gradient(
              ellipse at 52% 20%,
              rgba(255,255,255,0.055),
              transparent 48%
            );

          animation:
            stormAmbient
            6.8s
            ease-in-out
            infinite;
        }

        .storm-sky-flash {
          background:
            rgba(255,255,255,0);

          animation:
            stormSkyFlash
            6.8s
            linear
            infinite;
        }

        .storm-secondary-flash {
          background:
            rgba(255,255,255,0);

          animation:
            stormSecondaryFlash
            6.8s
            linear
            infinite;
        }

        .storm-horizon-flash {
          background:
            radial-gradient(
              ellipse at 50% 50%,
              rgba(255,255,255,0.0),
              rgba(255,255,255,0.0) 40%,
              transparent 75%
            );

          animation:
            stormHorizon
            6.8s
            linear
            infinite;
        }

        .storm-bolt {
          width: 30%;
          height: 70%;
          top: 0;
          opacity: 0;

          filter:
            drop-shadow(
              0 0 8px
              rgba(255,255,255,0.35)
            );
        }

        .storm-bolt-one {
          left: 25%;

          animation:
            boltOne
            6.8s
            linear
            infinite;
        }

        .storm-bolt-two {
          right: 16%;

          animation:
            boltTwo
            6.8s
            linear
            infinite;
        }

        @keyframes stormAmbient {
          0%,
          68%,
          100% {
            opacity: 0;
          }

          70% {
            opacity: 0.65;
          }

          71.5% {
            opacity: 0.05;
          }

          73% {
            opacity: 0.35;
          }

          74% {
            opacity: 0;
          }
        }

        @keyframes stormSkyFlash {
          0%,
          68%,
          100% {
            background:
              rgba(255,255,255,0);
          }

          70% {
            background:
              rgba(255,255,255,0.075);
          }

          70.35% {
            background:
              rgba(255,255,255,0);
          }

          72% {
            background:
              rgba(255,255,255,0.045);
          }

          72.35% {
            background:
              rgba(255,255,255,0);
          }

          74% {
            background:
              rgba(255,255,255,0.025);
          }

          74.25% {
            background:
              rgba(255,255,255,0);
          }
        }

        @keyframes stormSecondaryFlash {
          0%,
          69%,
          100% {
            opacity: 0;
          }

          70.1% {
            opacity: 0.9;
          }

          70.6% {
            opacity: 0;
          }

          72.1% {
            opacity: 0.45;
          }

          72.5% {
            opacity: 0;
          }
        }

        @keyframes stormHorizon {
          0%,
          68%,
          100% {
            opacity: 0;
          }

          70% {
            opacity: 0.9;

            background:
              radial-gradient(
                ellipse at 50% 50%,
                rgba(255,255,255,0.10),
                transparent 65%
              );
          }

          71% {
            opacity: 0;
          }

          72% {
            opacity: 0.45;
          }

          73% {
            opacity: 0;
          }
        }

        @keyframes boltOne {
          0%,
          69.5%,
          100% {
            opacity: 0;
          }

          70% {
            opacity: 0.95;
          }

          70.3% {
            opacity: 0;
          }

          72% {
            opacity: 0.8;
          }

          72.25% {
            opacity: 0;
          }

          73% {
            opacity: 0.35;
          }

          73.2% {
            opacity: 0;
          }
        }

        @keyframes boltTwo {
          0%,
          71.5%,
          100% {
            opacity: 0;
          }

          72% {
            opacity: 0.8;
          }

          72.25% {
            opacity: 0;
          }

          73% {
            opacity: 0.45;
          }

          73.25% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .storm-ambient-glow,
          .storm-sky-flash,
          .storm-secondary-flash,
          .storm-horizon-flash,
          .storm-bolt-one,
          .storm-bolt-two {
            animation:
              none !important;
          }

          .storm-bolt {
            opacity:
              0.15;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   HAZE
   ============================================================ */

function Haze() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 32%, rgba(220,220,210,0.10), rgba(180,180,170,0.045) 32%, transparent 68%)',
          filter:
            'blur(24px)',
        }}
      />

      <div
        className="absolute left-[-15%] right-[-15%] top-[25%] h-[190px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(205,205,195,0.055), transparent)',
          filter:
            'blur(30px)',
        }}
      />

      <div
        className="absolute left-[-15%] right-[-15%] top-[52%] h-[230px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(180,180,170,0.035), transparent)',
          filter:
            'blur(35px)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(200,200,190,0.045), transparent 42%, rgba(0,0,0,0.22))',
        }}
      />
    </>
  );
}

/* ============================================================
   VIGNETTE
   ============================================================ */

function Vignette() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(circle at 50% 38%, transparent 10%, rgba(0,0,0,0.10) 52%, rgba(0,0,0,0.38) 100%)',
      }}
    />
  );
}

/* ============================================================
   MAIN WEATHER BACKGROUND
   ============================================================ */

export function WeatherBackground({
  visual,
}: WeatherBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[5] overflow-hidden pointer-events-none"
    >

      {/* ======================================================
          BASE
          ====================================================== */}

      <div className="absolute inset-0 bg-[#050505]" />

      {/* ======================================================
          CLEAR NIGHT
          ====================================================== */}

      {visual === 'CLEAR_NIGHT' && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 8%, rgba(255,255,255,0.045), transparent 42%), radial-gradient(ellipse at 20% 35%, rgba(255,255,255,0.018), transparent 50%), linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(5,5,5,0.18) 45%, rgba(0,0,0,0.42) 100%)',
            }}
          />

          <NightAtmosphere />

          <MoonlightAtmosphere />

          <NightHorizon />

          <Stars />

          <ShootingStars />

          <Moon />
        </>
      )}

      {/* ======================================================
          SUNNY
          ====================================================== */}

      {visual === 'SUNNY_DAY' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 82% 7%, rgba(255,255,255,0.085), transparent 32%), linear-gradient(to bottom, #0b0b0b, #060606 55%, #020202)',
            }}
          />

          <Sun />
        </>
      )}

      {/* ======================================================
          CLOUDY — ENHANCED ONLY HERE
          ====================================================== */}

      {visual === 'CLOUDY' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #080808, #050505 55%, #020202)',
            }}
          />

          <EnhancedCloudy />
        </>
      )}

      {/* ======================================================
          DRIZZLE — ORIGINAL SYSTEM
          ====================================================== */}

      {visual === 'DRIZZLE' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #080808, #050505 58%, #020202)',
            }}
          />

          <Clouds />
          <Drizzle />
        </>
      )}

      {/* ======================================================
          HEAVY RAIN — ORIGINAL SYSTEM
          ====================================================== */}

      {visual === 'RAINY' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #060606, #030303 58%, #010101)',
            }}
          />

          <Clouds />
          <Rain />
        </>
      )}

      {/* ======================================================
          THUNDERSTORM — ORIGINAL SYSTEM
          ====================================================== */}

      {visual === 'THUNDERSTORM' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 10%, rgba(255,255,255,0.035), transparent 40%), linear-gradient(to bottom, #030303, #010101 68%, #000000)',
            }}
          />

          <Clouds storm />
          <Rain />
          <Lightning />
        </>
      )}

      {/* ======================================================
          HAZY
          ====================================================== */}

      {visual === 'HAZY' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #090909, #060606 55%, #030303)',
            }}
          />

          <Haze />
          <Clouds />
        </>
      )}

      {/* ======================================================
          GLOBAL READABILITY
          ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.18))',
        }}
      />

      {/* ======================================================
          GLOBAL VIGNETTE
          ====================================================== */}

      <Vignette />

    </div>
  );
}