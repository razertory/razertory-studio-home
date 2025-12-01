阅读下面的代码把它作为 home.tsx 的主要内容
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Razertory Terminal</title>
    <!-- Import Pixel Font and Monospace Font -->
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --bg-color: #0e0e0e;
            --text-color: #e6edf3;
            --pink-accent: #ff90e8; 
            --blue-accent: #90e8ff;
            --purple-accent: #bd93f9;
            --dim-border: #30363d;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Space Mono', monospace;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        /* The Retro Title Container */
        .hero-section {
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            transform: scale(0.9); /* Scale down slightly for mobile safety */
        }

        @media (min-width: 768px) {
            .hero-section {
                transform: scale(1.2);
            }
        }

        /* The Big Pink Arrow */
        .pixel-arrow {
            font-family: 'Press Start 2P', cursive;
            font-size: 4rem;
            color: var(--pink-accent);
            margin-right: 1.5rem;
            text-shadow: 4px 4px 0px rgba(255, 144, 232, 0.3);
            animation: pulse 2s infinite;
        }

        /* The Main "RAZERTORY" Text */
        .pixel-title {
            font-family: 'Press Start 2P', cursive;
            font-size: 4rem;
            line-height: 1;
            letter-spacing: -2px;
            /* Gradient Text */
            background: linear-gradient(90deg, 
                #ff90e8 0%, 
                #bd93f9 40%, 
                #90e8ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            
            /* Emulating the block shadow using filter drop-shadow since text-shadow doesn't work well with gradient text */
            filter: drop-shadow(6px 6px 0px rgba(45, 45, 45, 1));
            position: relative;
        }

        /* Tips Section */
        .tips-container {
            width: 100%;
            max-width: 800px;
            padding: 0 1rem;
            margin-bottom: 3rem;
        }

        .tips-title {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: #c9d1d9;
        }

        .tips-list {
            list-style: none;
            padding: 0;
            color: #c9d1d9;
        }

        .tips-list li {
            margin-bottom: 0.25rem;
            display: flex;
            align-items: flex-start;
        }

        .tips-list li::before {
            content: counter(list-item) ". ";
            margin-right: 0.5rem;
            color: #8b949e;
        }

        .tips-list {
            counter-reset: list-item;
        }

        .tips-list li {
            counter-increment: list-item;
        }

        .highlight-cmd {
            color: var(--pink-accent);
            font-weight: bold;
        }

        /* Status Line */
        .status-line {
            color: #8b949e;
            margin-top: 1.5rem;
            font-size: 0.9rem;
        }

        /* Input Area */
        .input-wrapper {
            width: 100%;
            max-width: 800px;
            padding: 0 1rem;
        }

        .cmd-input-box {
            border: 1px solid var(--dim-border);
            background-color: transparent;
            border-radius: 8px;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            font-family: 'Space Mono', monospace;
            font-size: 1rem;
            color: #c9d1d9;
            box-shadow: 0 0 0 0 rgba(0,0,0,0);
            transition: border-color 0.2s, box-shadow 0.2s;
            cursor: text;
        }

        .cmd-input-box:hover {
            border-color: #58a6ff;
        }

        .cmd-input-box:focus-within {
            border-color: #58a6ff;
            box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.3);
        }

        .prompt-char {
            color: var(--pink-accent);
            margin-right: 10px;
            font-weight: bold;
        }

        .cursor-block {
            display: inline-block;
            width: 10px;
            height: 1.2em;
            background-color: #c9d1d9;
            animation: blink 1s step-end infinite;
            margin-right: 4px;
        }

        .placeholder-text {
            color: #484f58;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }

        /* Scanline effect overlay (optional retro touch) */
        .scanlines {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0,0,0,0.1) 50%,
                rgba(0,0,0,0.1)
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 10;
        }
    </style>
</head>
<body>

    <div class="scanlines"></div>

    <div class="hero-section">
        <div class="pixel-arrow">&gt;</div>
        <div class="pixel-title">RAZERTORY</div>
    </div>

    <div class="tips-container">
        <div class="tips-title">Tips for getting started:</div>
        <ul class="tips-list">
            <li>Ask questions, edit files, or run commands.</li>
            <li>Be specific for the best results.</li>
            <li><span class="highlight-cmd">/help</span> for more information.</li>
        </ul>
        
        <div class="status-line">Using 1 RAZERTORY.md file</div>
    </div>

    <div class="input-wrapper">
        <div class="cmd-input-box" onclick="document.getElementById('hidden-input').focus()">
            <span class="prompt-char">&gt;</span>
            <span class="cursor-block"></span>
            <span class="placeholder-text">Type your message or @path/to/file</span>
            <!-- Hidden input to handle mobile keyboard logic if this were a real app -->
            <input type="text" id="hidden-input" style="opacity: 0; width: 0; height: 0; position: absolute;">
        </div>
    </div>

    <script>
        // Simple logic to make the cursor interact slightly
        const inputBox = document.querySelector('.cmd-input-box');
        const hiddenInput = document.getElementById('hidden-input');
        const cursor = document.querySelector('.cursor-block');
        const placeholder = document.querySelector('.placeholder-text');

        // Handle typing simulation
        hiddenInput.addEventListener('input', (e) => {
            const val = e.target.value;
            if(val.length > 0) {
                placeholder.textContent = val;
                placeholder.style.color = "#c9d1d9";
            } else {
                placeholder.textContent = "Type your message or @path/to/file";
                placeholder.style.color = "#484f58";
            }
        });

        // Focus effects
        inputBox.addEventListener('click', () => {
            hiddenInput.focus();
            cursor.style.animation = 'none'; // Pause blink when typing (optional stylistic choice)
            cursor.style.opacity = '1';
            setTimeout(() => {
                cursor.style.animation = 'blink 1s step-end infinite';
            }, 100);
        });
    </script>
</body>
</html>
```