# 💪 Calisthenics Workout App

An interactive web application for a full-body calisthenics workout program featuring video demonstrations, timers, and a step-by-step workout mode.

## ✨ Features

- **📋 Block-Based Navigation**: 6 workout blocks (A-E + Stretching) with easy switching
- **🎥 Video Demonstrations**: 20 exercise videos with auto-loop playback
- **⏱️ Built-in Timers**: Rest timers and exercise timers for time-based movements
- **🚀 Workout Mode**: Step-by-step guided workout through all exercises
- **🎨 Dark Mode Design**: Professional, aesthetic UI optimized for gym environments
- **📱 Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **⚡ Fast & Lightweight**: Built with React + Vite for optimal performance

## 🏋️ Workout Program

### Block A - Primary Strength (3 exercises)
- Pull-ups
- Chin-ups
- Ring Dips

### Block B - Chest (1 exercise)
- Ring Push-ups (elevated)

### Block C - Back + Shoulders (3 exercises)
- Ring Rows
- Ring Y Raises
- Ring Face Pull

### Block D - Legs (4 exercises)
- Bulgarian Split Squat
- Pistol Squat
- Nordic Curl
- Calf Raises

### Block E - Core (3 exercises)
- L-sit
- Leg Raises
- Twist Raises

### Stretching (6 stretches)
- Chest stretch
- Lat stretch
- Shoulder stretch
- Hip flexor stretch
- Hamstring stretch
- Calf stretch

**Total: 20 exercises with video demonstrations**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the app directory**
   ```bash
   cd calisthenics-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173/`
   - The app will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

### Browse Exercises

1. **Select a Block**: Click on any block (A-E or Stretching) in the navigation bar
2. **View Exercises**: See all exercises in the selected block displayed as cards
3. **Click an Exercise**: Opens a detailed view with:
   - Video demonstration (auto-plays and loops)
   - Sets and reps information
   - Muscle groups targeted
   - Tips to make the exercise easier
   - Timer (for time-based exercises)

### Start a Full Workout

1. **Click "Start Full Workout"** button at the top
2. **Follow the guided flow**:
   - View current exercise with video
   - Complete the exercise
   - Click "Next Exercise"
   - Rest timer automatically starts (60 seconds)
   - Continue through all 20 exercises
3. **Navigate**: Use Previous/Next buttons or Exit anytime

### Use the Timer

- **Time-based exercises** (L-sit, stretches) include an automatic timer
- **Start/Pause**: Control the countdown
- **Reset**: Return to original duration
- **Visual progress**: Circular progress indicator

## 🎨 Design Features

- **Dark Mode**: Easy on the eyes during workouts
- **High Contrast**: Excellent readability in various lighting conditions
- **Smooth Animations**: Professional transitions and hover effects
- **Touch-Friendly**: Large tap targets for mobile use
- **Minimal Distractions**: Focus on the workout

## 🛠️ Tech Stack

- **React 18**: Modern UI library
- **Vite**: Lightning-fast build tool
- **CSS-in-JS**: Inline styles for simplicity
- **No external dependencies**: Lightweight and fast

## 📁 Project Structure

```
calisthenics-app/
├── public/
│   └── videos/              # 20 exercise videos (MP4)
├── src/
│   ├── components/
│   │   ├── BlockSelector.jsx    # Block navigation
│   │   ├── ExerciseCard.jsx     # Exercise display card
│   │   ├── ExerciseDetail.jsx   # Modal with video & details
│   │   ├── Timer.jsx            # Countdown timer
│   │   ├── VideoPlayer.jsx      # Video component
│   │   └── WorkoutMode.jsx      # Guided workout flow
│   ├── data/
│   │   └── exercises.json       # All exercise data
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Key Components

### BlockSelector
- Displays all workout blocks
- Highlights active block
- Shows exercise count per block
- Horizontal scroll on mobile

### ExerciseCard
- Shows exercise name, sets/reps, muscles
- Hover to see "make easier" tips
- Click to open detailed view

### ExerciseDetail
- Full-screen modal
- Video player with controls
- Exercise information
- Timer for time-based exercises
- Close with X button or Escape key

### Timer
- Circular progress indicator
- Start/Pause/Reset controls
- Visual and color-coded (rest vs exercise)
- Completion callback

### WorkoutMode
- Step-by-step exercise flow
- Progress bar showing completion
- Automatic rest periods (60s)
- Skip rest option
- Previous/Next navigation

## 🔧 Customization

### Modify Exercise Data
Edit `src/data/exercises.json` to:
- Change sets, reps, or time
- Update muscle groups
- Modify "make easier" tips
- Add/remove exercises

### Adjust Rest Time
In `src/components/WorkoutMode.jsx`, change:
```javascript
const [restDuration] = useState(60); // Change to desired seconds
```

### Update Colors
In `src/index.css`, modify CSS variables:
```css
:root {
  --accent: #00ff88;        /* Primary accent color */
  --accent-hover: #00cc6a;  /* Hover state */
  /* ... other colors */
}
```

## 🐛 Troubleshooting

### Videos not playing
- Ensure videos are in `public/videos/` folder
- Check video file names match `exercises.json`
- Try a different browser (some block autoplay)

### App not loading
- Clear browser cache
- Check console for errors (F12)
- Ensure Node.js 16+ is installed
- Delete `node_modules` and run `npm install` again

### Styling issues
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser zoom level (should be 100%)
