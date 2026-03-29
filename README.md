# 💪 Calisthenics Workout App

Interactive web app for a complete calisthenics workout program with video demonstrations, form guidance, and guided workout mode.

## ✨ Features

- **23 Exercises** across 7 blocks with video demonstrations
- **Comprehensive Exercise Data**: Form guidance, progression tips, rest periods
- **Guided Workout Mode**: Step-by-step flow through all exercises
- **Built-in Timers**: Rest periods and time-based exercises
- **Dark Mode Design**: Optimized for gym environments
- **Fully Responsive**: Mobile, tablet, and desktop support

## 🏋️ Workout Structure

| Block | Focus | Exercises |
|-------|-------|-----------|
| **A** | Primary Strength | Pull-ups, Chin-ups, Ring Dips |
| **B** | Chest | Ring Push-ups |
| **D** | Legs | Bulgarian Split Squat, Pistol Squat, Nordic Curl, Calf Raises |
| **C** | Back + Shoulders | Ring Rows, Y Raises, Ring Face Pull |
| **E** | Core | L-sit, Leg Raises, Twist Raises |
| **F** | Arms | Ring Bicep Curls, Ring Tricep Extensions |
| **Stretching** | Recovery | 7 stretches (Chest, Lat, Cobra, Shoulder, Hip Flexor, Hamstring, Calf) |

**Total: 23 exercises with complete video demonstrations**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173/` in your browser.

## 📖 Usage

### Browse Exercises
1. Select a block from the navigation
2. Click any exercise to view:
   - Video demonstration (auto-loop)
   - Correct form guidance
   - Progression options (easier/harder)
   - Rest period recommendations
   - Targeted muscle groups

### Guided Workout
1. Click **"Start Full Workout"**
2. Follow step-by-step through all 23 exercises
3. Automatic rest timers between exercises
4. Track progress with visual indicators

## 🛠️ Tech Stack

- **React 18** + **Vite** - Fast, modern development
- **CSS-in-JS** - Component-scoped styling
- **Zero dependencies** - Lightweight and performant

## 📁 Project Structure

```
calisthenics-app/
├── public/videos/          # 23 exercise videos
├── src/
│   ├── components/         # React components
│   ├── data/
│   │   └── exercises.json  # Exercise database
│   └── App.jsx
└── package.json
```

## 🎯 Exercise Data Schema

Each exercise includes:
- **Sets & Reps**: Volume recommendations
- **Muscles**: Target muscle groups
- **Correct Form**: Execution guidance
- **Make Easier**: Regression options
- **Make Harder**: Progression options
- **Rest**: Recovery time between sets

## 🔧 Customization

Edit `src/data/exercises.json` to modify exercises, or adjust rest periods in `src/components/WorkoutMode.jsx`.

## 📝 License

Built with React + Vite • 2026
