export function HealthcareIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto max-w-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="200"
          cy="150"
          r="120"
          fill="url(#gradient1)"
          opacity="0.1"
          className="animate-pulse"
        />
        
        {/* Medical Cross */}
        <g transform="translate(200, 150)">
          <rect
            x="-15"
            y="-50"
            width="30"
            height="100"
            fill="currentColor"
            className="text-primary"
          />
          <rect
            x="-50"
            y="-15"
            width="100"
            height="30"
            fill="currentColor"
            className="text-primary"
          />
        </g>

        {/* Floating Elements */}
        <circle
          cx="100"
          cy="80"
          r="8"
          fill="currentColor"
          className="text-blue-400 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <circle
          cx="300"
          cy="220"
          r="6"
          fill="currentColor"
          className="text-purple-400 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <circle
          cx="320"
          cy="100"
          r="10"
          fill="currentColor"
          className="text-cyan-400 animate-float"
          style={{ animationDelay: "2s" }}
        />

        {/* Heart Icon */}
        <path
          d="M150 120 C150 100, 170 90, 180 110 C190 90, 210 100, 210 120 C210 140, 180 170, 180 170 C180 170, 150 140, 150 120 Z"
          fill="currentColor"
          className="text-red-400"
          opacity="0.6"
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

