@echo off
REM ============================================================================
REM ANUBIS MUSEUM - PROJECT VERIFICATION SCRIPT
REM This script verifies that all files are in place and project is ready
REM ============================================================================

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         ANUBIS MUSEUM PROJECT VERIFICATION SCRIPT             ║
echo ║                    Deployment Check v2.0                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Color codes for output
set "pass=[PASS]"
set "fail=[FAIL]"

REM Counter for results
set /a checks=0
set /a passed=0

REM ============================================================================
REM 1. CHECK CORE FILES
REM ============================================================================

echo 1. CHECKING CORE FILES...
echo ─────────────────────────────────────────

if exist "index.html" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% index.html exists
) else (
    set /a checks+=1
    echo %fail% index.html MISSING
)

if exist "css\styles.css" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% css\styles.css exists
) else (
    set /a checks+=1
    echo %fail% css\styles.css MISSING
)

if exist "js\app.js" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% js\app.js exists
) else (
    set /a checks+=1
    echo %fail% js\app.js MISSING
)

if exist "css\animations.css" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% css\animations.css exists
) else (
    set /a checks+=1
    echo %fail% css\animations.css MISSING
)

REM ============================================================================
REM 2. CHECK DATA FILES
REM ============================================================================

echo.
echo 2. CHECKING DATA FILES...
echo ─────────────────────────────────────────

if exist "data\places.json" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% data\places.json exists
) else (
    set /a checks+=1
    echo %fail% data\places.json MISSING
)

if exist "data\rulers.json" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% data\rulers.json exists
) else (
    set /a checks+=1
    echo %fail% data\rulers.json MISSING
)

if exist "data\timeline.json" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% data\timeline.json exists
) else (
    set /a checks+=1
    echo %fail% data\timeline.json MISSING
)

if exist "data\testimonials.json" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% data\testimonials.json exists
) else (
    set /a checks+=1
    echo %fail% data\testimonials.json MISSING
)

REM ============================================================================
REM 3. CHECK IMAGE FOLDERS
REM ============================================================================

echo.
echo 3. CHECKING IMAGE ASSETS...
echo ─────────────────────────────────────────

if exist "assets\img\anubis" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% assets\img\anubis folder exists
) else (
    set /a checks+=1
    echo %fail% assets\img\anubis folder MISSING
)

if exist "assets\img\places" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% assets\img\places folder exists
) else (
    set /a checks+=1
    echo %fail% assets\img\places folder MISSING
)

if exist "assets\img\artifacts" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% assets\img\artifacts folder exists
) else (
    set /a checks+=1
    echo %fail% assets\img\artifacts folder MISSING
)

REM ============================================================================
REM 4. CHECK DOCUMENTATION
REM ============================================================================

echo.
echo 4. CHECKING DOCUMENTATION FILES...
echo ─────────────────────────────────────────

if exist "QUICK_FIX_SUMMARY.md" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% QUICK_FIX_SUMMARY.md
) else (
    set /a checks+=1
    echo %fail% QUICK_FIX_SUMMARY.md MISSING
)

if exist "PROJECT_COMPLETION_REPORT.md" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% PROJECT_COMPLETION_REPORT.md
) else (
    set /a checks+=1
    echo %fail% PROJECT_COMPLETION_REPORT.md MISSING
)

if exist "PHARAONIC_OVERLAYS_GUIDE.md" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% PHARAONIC_OVERLAYS_GUIDE.md
) else (
    set /a checks+=1
    echo %fail% PHARAONIC_OVERLAYS_GUIDE.md MISSING
)

if exist "FIXES_AND_ENHANCEMENTS_REPORT.md" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% FIXES_AND_ENHANCEMENTS_REPORT.md
) else (
    set /a checks+=1
    echo %fail% FIXES_AND_ENHANCEMENTS_REPORT.md MISSING
)

REM ============================================================================
REM 5. CHECK PAGES
REM ============================================================================

echo.
echo 5. CHECKING PAGE FILES...
echo ─────────────────────────────────────────

if exist "pages\artifacts.html" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% pages\artifacts.html
) else (
    set /a checks+=1
    echo %fail% pages\artifacts.html MISSING
)

if exist "pages\wisdom.html" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% pages\wisdom.html
) else (
    set /a checks+=1
    echo %fail% pages\wisdom.html MISSING
)

if exist "pages\judgment.html" (
    set /a checks+=1
    set /a passed+=1
    echo %pass% pages\judgment.html
) else (
    set /a checks+=1
    echo %fail% pages\judgment.html MISSING
)

REM ============================================================================
REM SUMMARY
REM ============================================================================

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    VERIFICATION SUMMARY                       ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Total Checks: %checks%
echo Passed:       %passed%
echo Failed:       %checks%-%passed%
echo.

if %passed% equ %checks% (
    echo ✓ ALL CHECKS PASSED
    echo.
    echo ✓✓✓ PROJECT IS READY FOR DEPLOYMENT ✓✓✓
    echo.
    echo Next Steps:
    echo 1. Review QUICK_FIX_SUMMARY.md
    echo 2. Review PROJECT_COMPLETION_REPORT.md
    echo 3. Deploy to production server
    echo.
    exit /b 0
) else (
    echo ✗ SOME CHECKS FAILED
    echo.
    echo Please fix the missing files before deployment.
    echo.
    exit /b 1
)
