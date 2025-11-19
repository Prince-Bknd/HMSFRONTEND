export function DoctorPatientIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-lg">
        {/* Doctor and Patient SVG Illustration */}
        <svg
          viewBox="0 0 400 350"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background - visible in both modes */}
          <rect
            x="0"
            y="0"
            width="400"
            height="350"
            fill="currentColor"
            className="text-slate-50 dark:text-slate-900"
            opacity="0.3"
            rx="20"
          />
          
          {/* Doctor Figure */}
          <g className="doctor-figure">
            {/* Doctor Head */}
            <circle
              cx="150"
              cy="100"
              r="35"
              fill="currentColor"
              className="text-slate-800 dark:text-slate-200"
            />
            {/* Doctor Body */}
            <rect
              x="120"
              y="135"
              width="60"
              height="100"
              rx="5"
              fill="currentColor"
              className="text-blue-700 dark:text-blue-400"
            />
            {/* Doctor Coat */}
            <path
              d="M 120 135 L 180 135 L 185 200 L 115 200 Z"
              fill="currentColor"
              className="text-white dark:text-slate-700"
            />
            {/* Stethoscope */}
            <circle
              cx="150"
              cy="120"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-slate-700 dark:text-slate-300"
            />
            <path
              d="M 142 120 Q 140 140 130 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-slate-700 dark:text-slate-300"
            />
          </g>

          {/* Patient Figure */}
          <g className="patient-figure">
            {/* Patient Head */}
            <circle
              cx="280"
              cy="120"
              r="30"
              fill="currentColor"
              className="text-slate-800 dark:text-slate-200"
            />
            {/* Patient Body */}
            <rect
              x="255"
              y="150"
              width="50"
              height="90"
              rx="5"
              fill="currentColor"
              className="text-emerald-700 dark:text-emerald-400"
            />
          </g>

          {/* Heart Icon (animated) */}
          <g className="heart-animation">
            <path
              d="M 200 180 C 200 160, 220 150, 230 170 C 240 150, 260 160, 260 180 C 260 200, 230 230, 230 230 C 230 230, 200 200, 200 180 Z"
              fill="currentColor"
              className="text-red-600 dark:text-red-400"
              opacity="0.9"
            />
          </g>

          {/* Medical Icons Floating */}
          <g className="floating-icons">
            <circle
              cx="80"
              cy="200"
              r="15"
              fill="currentColor"
              className="text-blue-600 dark:text-blue-400"
              opacity="0.7"
            />
            <circle
              cx="320"
              cy="250"
              r="12"
              fill="currentColor"
              className="text-emerald-600 dark:text-emerald-400"
              opacity="0.7"
            />
          </g>

          {/* Connection Line */}
          <line
            x1="180"
            y1="180"
            x2="255"
            y2="180"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="text-primary opacity-50"
          />
        </svg>

        {/* CSS Animated Emojis */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="emoji-float-1">❤️</div>
          <div className="emoji-float-2">🏥</div>
          <div className="emoji-float-3">💊</div>
          <div className="emoji-float-4">⚕️</div>
        </div>
      </div>

      <style>{`
        .doctor-figure {
          animation: gentle-bounce 3s ease-in-out infinite;
        }
        .patient-figure {
          animation: gentle-bounce 3s ease-in-out infinite 0.5s;
        }
        .heart-animation {
          animation: heartbeat 2s ease-in-out infinite;
        }
        .floating-icons circle {
          animation: float 4s ease-in-out infinite;
        }
        .floating-icons circle:nth-child(2) {
          animation-delay: 1s;
        }
        .emoji-float-1 {
          position: absolute;
          top: 10%;
          left: 10%;
          font-size: 2rem;
          animation: float-emoji 5s ease-in-out infinite;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        .emoji-float-2 {
          position: absolute;
          top: 20%;
          right: 15%;
          font-size: 1.8rem;
          animation: float-emoji 6s ease-in-out infinite 1s;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        .emoji-float-3 {
          position: absolute;
          bottom: 25%;
          left: 15%;
          font-size: 1.5rem;
          animation: float-emoji 4s ease-in-out infinite 2s;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        .emoji-float-4 {
          position: absolute;
          bottom: 15%;
          right: 10%;
          font-size: 1.6rem;
          animation: float-emoji 5.5s ease-in-out infinite 0.5s;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(5px); }
          66% { transform: translateY(-5px) translateX(-5px); }
        }
        @keyframes float-emoji {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
