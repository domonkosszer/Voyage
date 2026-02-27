"use client";

export default function VoyageStickLoop({
                                            size = 220,
                                        }: {
    size?: number;
}) {
    return (
        <div style={{ width: size, height: size }}>
            <svg
                viewBox="0 0 200 200"
                width="100%"
                height="100%"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <g
                    stroke="#CCCCCC"
                    strokeWidth="5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    transform="translate(100 100)"
                >
                    {/* LEFT STROKE */}
                    <line x1="0" y1="0" x2="42" y2="42">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0;90;180;270;360"
                            dur="6s"
                            repeatCount="indefinite"
                        />
                    </line>

                    {/* RIGHT STROKE */}
                    <line x1="0" y1="-0" x2="42" y2="-42">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0;90;180;270;360"
                            dur="6s"
                            repeatCount="indefinite"
                        />
                    </line>


                    {/* CENTER EXCLAMATION STROKE */}
                    {/*
                    <line x1="0" y1="0" x2="0" y2="-60">
                        <animate
                            attributeName="x2"
                            values="0;0;0;0;0"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </line>
                    */}

                    <circle cx="0" cy="-70" r="0.2">
                        <animate
                            attributeName="cy"
                            values="-85;0;95;0;-85"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
        </div>
    );
}