# AIOS - Design System

> **Project:** AI Operating System for Businesses (AIOS)
>
> Version: 1.0

---

# Design Philosophy

AIOS should feel like an operating system, not a website.

The interface should communicate

- Professionalism
- Intelligence
- Speed
- Simplicity
- Trust
- Enterprise-grade quality

Design inspiration should come from products like

- Linear
- Vercel Dashboard
- Notion
- GitHub
- Stripe Dashboard
- OpenAI Platform
- Cursor
- Raycast
- Slack
- Figma

---

# Design Principles

## 1. Minimal

Remove unnecessary UI.

Everything should have a purpose.

---

## 2. Information First

Content is more important than decoration.

---

## 3. Consistency

Every spacing

Every color

Every icon

Every font size

should follow the design system.

---

## 4. Responsive

Support

- Desktop
- Laptop
- Tablet
- Mobile

Desktop should be the primary experience.

---

## 5. Accessibility

Follow WCAG AA

Minimum contrast ratio

4.5:1

Keyboard Navigation

Screen Reader Support

Focus Indicators

Reduced Motion Support

---

# Theme

Default

Dark Mode

Secondary

Light Mode

Never build Light Mode first.

---

# Color Palette

## Primary

```
Primary Blue

#4F46E5
```

Used for

- Primary Buttons
- Links
- Active Navigation
- Progress
- Charts

---

## Secondary

```
Purple

#7C3AED
```

Used for

- AI Features
- Workflow Highlights
- Agent Cards

---

## Accent

```
Cyan

#06B6D4
```

Used for

- Selected Items
- Active Agent
- Notifications

---

## Success

```
#22C55E
```

---

## Warning

```
#F59E0B
```

---

## Error

```
#EF4444
```

---

## Info

```
#3B82F6
```

---

# Neutral Colors

## Background

```
#09090B
```

---

## Card

```
#18181B
```

---

## Surface

```
#27272A
```

---

## Border

```
#3F3F46
```

---

## Hover

```
#3A3A3D
```

---

## Divider

```
#2A2A2A
```

---

# Text Colors

Primary

```
#FAFAFA
```

Secondary

```
#A1A1AA
```

Muted

```
#71717A
```

Disabled

```
#52525B
```

Inverse

```
#09090B
```

---

# Typography

## Primary Font

```
Geist
```

Fallback

```
Inter
```

Fallback

```
System UI
```

Never mix multiple fonts.

---

## Font Sizes

Display

```
48px
```

H1

```
36px
```

H2

```
30px
```

H3

```
24px
```

H4

```
20px
```

H5

```
18px
```

Body Large

```
16px
```

Body

```
14px
```

Small

```
13px
```

Caption

```
12px
```

---

## Font Weights

Regular

400

Medium

500

SemiBold

600

Bold

700

Avoid ExtraBold unless required.

---

## Line Heights

Heading

120%

Body

160%

Caption

150%

---

# Spacing System

Base Unit

```
4px
```

Spacing Scale

```
4

8

12

16

20

24

32

40

48

64

80

96
```

Never use random spacing.

---

# Border Radius

Buttons

```
10px
```

Cards

```
16px
```

Inputs

```
10px
```

Dialogs

```
20px
```

Badges

```
999px
```

---

# Shadows

Cards

```
Small Shadow
```

Dialogs

```
Medium Shadow
```

Floating Components

```
Large Shadow
```

Avoid excessive shadows.

---

# Icon System

Library

```
Lucide React
```

Icon Size

16

20

24

32

Never mix icon libraries.

---

# Layout

Maximum Width

```
1600px
```

Sidebar

```
280px
```

Collapsed Sidebar

```
72px
```

Navbar

```
72px
```

Content Padding

```
32px
```

Grid Gap

```
24px
```

---

# Component Design

## Buttons

Primary

Filled

Secondary

Outline

Ghost

Danger

Icon Button

Loading Button

Disabled Button

---

## Cards

Rounded

Large Padding

Header

Content

Footer

Hover Animation

---

## Inputs

Rounded

Clear Labels

Validation

Helper Text

Icons

---

## Tables

Sticky Header

Pagination

Sorting

Filtering

Search

Row Selection

Bulk Actions

---

## Dialogs

Centered

Blur Background

Escape to Close

Keyboard Accessible

---

## Dropdowns

Searchable

Keyboard Navigation

Grouped Items

Icons

---

## Navigation

Left Sidebar

Top Command Bar

Breadcrumbs

Profile Menu

Workspace Switcher

---

# Dashboard Layout

```
-------------------------------------------------------

Top Navigation

-------------------------------------------------------

Sidebar

|

|

|

Main Content

|

|

|

Analytics

|

Recent Tasks

|

Agent Status

-------------------------------------------------------
```

---

# Dashboard Widgets

Organization Overview

Active AI Agents

Running Workflows

Completed Tasks

Token Usage

Cost

Recent Notifications

System Health

Upcoming Approvals

Recent Activity

---

# Agent Card

Should display

- Avatar
- Name
- Role
- Model
- Status
- Department
- Memory Enabled
- Assigned Tasks

Actions

- Open
- Edit
- Pause
- Delete

---

# Workflow Builder

Use

React Flow

Node Types

Start

Task

AI Agent

Condition

Approval

Delay

End

Connections

Smooth Curves

Zoom

Mini Map

Grid Background

---

# Analytics

Charts

Bar

Line

Area

Pie

Heatmap

Timeline

Use

Apache ECharts

Avoid flashy animations.

---

# Animations

Library

Framer Motion

Animation Duration

150ms

250ms

400ms

Use

Fade

Slide

Scale

Avoid

Bounce

Spin

Long Animations

---

# Loading States

Skeletons

Progress Bars

Loading Spinner

Shimmer Cards

Never leave blank pages.

---

# Empty States

Illustration

Title

Description

Primary Action

Example

"No AI Agents Found"

Button

Create Agent

---

# Error States

Friendly Message

Retry Button

Support Link

Error ID

---

# Notifications

Toast

Top Right

Auto Close

4 Seconds

Types

Success

Error

Warning

Info

---

# Status Colors

Online

Green

Offline

Gray

Busy

Orange

Error

Red

Paused

Yellow

---

# AI Specific Design

AI Response

Different background color

Tool Calls

Terminal style card

Reasoning

Collapsible panel

Memory Retrieved

Highlighted section

Workflow Progress

Timeline View

---

# Responsive Breakpoints

Mobile

```
640px
```

Tablet

```
768px
```

Laptop

```
1024px
```

Desktop

```
1280px
```

Wide

```
1536px
```

---

# UI Libraries

Use

- Tailwind CSS
- shadcn/ui
- Radix UI
- Lucide Icons
- Framer Motion
- React Flow
- TanStack Table
- Sonner (Toast)
- React Hook Form

Avoid

- Bootstrap
- Material UI
- Ant Design
- Chakra UI
- jQuery UI

---

# Images & Illustrations

Style

Flat

Minimal

Modern

Dark Theme Compatible

Prefer

SVG

Lottie (only when necessary)

Avoid

Stock photos

3D cartoon illustrations

Overly colorful graphics

---

# Logo Guidelines

Style

Minimal

Monogram + Wordmark

Primary Symbol

Hexagon

Circuit

AI Node

Network

Brain

Suggested Colors

Primary Blue

Purple

White

---

# Design Tokens

```css
--background: #09090B;
--card: #18181B;
--surface: #27272A;

--primary: #4F46E5;
--secondary: #7C3AED;
--accent: #06B6D4;

--success: #22C55E;
--warning: #F59E0B;
--danger: #EF4444;

--text-primary: #FAFAFA;
--text-secondary: #A1A1AA;
--text-muted: #71717A;

--border: #3F3F46;

--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 20px;

--spacing: 4px;
```

---

# Overall Visual Style

The final application should feel like a premium B2B SaaS product rather than a student project.

The experience should emphasize:
- Clean layouts with generous whitespace
- Consistent spacing and typography
- Subtle animations and transitions
- High information density without clutter
- Clear visual hierarchy
- Dark-first design with an optional light theme
- Fast, responsive interactions
- Enterprise-level polish suitable for product demonstrations and investor presentations
