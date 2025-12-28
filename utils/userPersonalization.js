// User Personalization Data Manager
// This will track all user selections from onboarding and Nappin AI setup

class UserPersonalizationManager {
  constructor() {
    this.debugTimeOverride = null; // For testing different times
    this.userProfile = {
      // Onboarding Flow Data
      goals: [],
      wellnessFocus: null,
      napEnvironment: null,
      napTiming: null,
      dailySchedule: null,
      preferredDevice: null,
      
      // Nappin AI Setup Data
      sleepDuration: null,
      bedtime: null,
      wakeTime: null,
      workSchedule: null,
      activityLevel: null,
      stressLevel: null,
      
      // Sleep Onset Data
      sleepLatencyLow: null,
      sleepLatencyHigh: null,
      sleepLatencyValue: null, // Calculated midpoint
      difficultyFallingAsleep: null, // 0-1 scale from slider
      restingHeartRate: null,
      sleeperType: null,
      
      // Calculated Readiness Factors
      timeBasedReadiness: 0,
      circadianAlignment: 0,
      personalFactors: 0,
      
      // Final Readiness Score
      overallReadiness: 0,
      
      // Activity-based data
      workoutTime: null,
      
      // Break time preference for 9-5 workers
      breakTime: null
    };
  }

  // Onboarding Flow Methods
  setGoals(goals) {
    this.userProfile.goals = goals;
    this.recalculateReadiness();
  }

  setWorkoutTime(workoutTime) {
    this.userProfile.workoutTime = workoutTime;
    console.log('Workout time set to:', workoutTime);
  }

  setBreakTime(breakTime) {
    this.userProfile.breakTime = breakTime;
    console.log('Break time set to:', breakTime);
    this.recalculateReadiness();
  }

  setWellnessFocus(focus) {
    this.userProfile.wellnessFocus = focus;
    this.recalculateReadiness();
  }

  setNapEnvironment(environment) {
    this.userProfile.napEnvironment = environment;
    this.recalculateReadiness();
  }

  setNapTiming(timing) {
    this.userProfile.napTiming = timing;
    this.recalculateReadiness();
  }

  setDailySchedule(schedule) {
    this.userProfile.dailySchedule = schedule;
    this.recalculateReadiness();
  }

  setPreferredDevice(device) {
    this.userProfile.preferredDevice = device;
    this.recalculateReadiness();
  }

  // Nappin AI Setup Methods
  setSleepDuration(duration) {
    this.userProfile.sleepDuration = duration;
    this.recalculateReadiness();
  }

  setBedtime(time) {
    this.userProfile.bedtime = time;
    this.recalculateReadiness();
  }

  setWakeTime(time) {
    this.userProfile.wakeTime = time;
    this.recalculateReadiness();
  }

  setWorkSchedule(schedule) {
    this.userProfile.workSchedule = schedule;
    this.recalculateReadiness();
  }

  setActivityLevel(level) {
    this.userProfile.activityLevel = level;
    this.recalculateReadiness();
  }

  setStressLevel(level) {
    this.userProfile.stressLevel = level;
    this.recalculateReadiness();
  }

  // Sleep Onset Data Setters
  setSleepLatency(low, high, value) {
    this.userProfile.sleepLatencyLow = low;
    this.userProfile.sleepLatencyHigh = high;
    this.userProfile.sleepLatencyValue = value;
  }

  setDifficultyFallingAsleep(difficulty) {
    this.userProfile.difficultyFallingAsleep = difficulty;
  }

  setRestingHeartRate(heartRate) {
    this.userProfile.restingHeartRate = heartRate;
  }

  setSleeperType(type) {
    this.userProfile.sleeperType = type;
  }

  // Helper to get current minutes since midnight
  getCurrentMinutesSinceMidnight() {
    const now = this.debugTimeOverride ? new Date(this.debugTimeOverride) : new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  // Readiness Calculation Methods
  calculateTimeBasedReadiness(currentMinuteParam = null) {
    // Use debug time override if set, otherwise use real time
    const now = this.debugTimeOverride ? new Date(this.debugTimeOverride) : new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour + currentMinutes / 60;
    const currentMinute = currentMinuteParam ?? this.getCurrentMinutesSinceMidnight();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    let timeScore = 50; // Base score

    // 1. USER'S NAP TIMING PREFERENCE (Highest Priority)
    if (this.userProfile.napTiming) {
      // Handle both array (multiple selections) and string (single selection)
      const timings = Array.isArray(this.userProfile.napTiming) ? this.userProfile.napTiming : [this.userProfile.napTiming];
      let bestTimingScore = 50; // Start with base score
      
      timings.forEach(timing => {
        let timingScore = 50; // Base for this timing
        
        switch (timing) {
          case 'morning':
            if (currentTime >= 9 && currentTime <= 12) {
              timingScore = 95; // High preference match
            } else if (currentTime >= 7 && currentTime <= 14) {
              timingScore = 70; // Close to preference
            }
            break;
          case 'midday':
          case 'afternoon':
            if (currentTime >= 12 && currentTime <= 15) {
              timingScore = 95; // High preference match
            } else if (currentTime >= 11 && currentTime <= 17) {
              timingScore = 70; // Close to preference
            }
            break;
          case 'evening':
            if (currentTime >= 17 && currentTime <= 20) {
              timingScore = 95; // High preference match
            } else if (currentTime >= 15 && currentTime <= 22) {
              timingScore = 70; // Close to preference
            }
            break;
          case 'flexible':
          case 'whenever_i_feel_tired':
            // Use general optimal times for flexible users
            if (currentTime >= 13 && currentTime <= 15) {
              timingScore = 85;
            } else if (currentTime >= 12 && currentTime <= 16) {
              timingScore = 70;
            }
            break;
        }
        
        // Use the best score from any selected timing
        bestTimingScore = Math.max(bestTimingScore, timingScore);
      });
      
      timeScore = bestTimingScore;
    } else {
      // Default circadian timing if no preference set
      if (currentTime >= 13 && currentTime <= 15) {
        timeScore = 85;
      } else if (currentTime >= 12 && currentTime <= 16) {
        timeScore = 70;
      } else if (currentTime >= 10 && currentTime <= 12) {
        timeScore = 50;
      }
    }

    // 2. WORK SCHEDULE ADJUSTMENT (High Priority)
    if (this.userProfile.dailySchedule) {
      // Handle both array (multiple selections) and string (single selection)
      const schedules = Array.isArray(this.userProfile.dailySchedule) ? this.userProfile.dailySchedule : [this.userProfile.dailySchedule];
      
      // Apply the most relevant schedule adjustment
      schedules.forEach(schedule => {
        switch (schedule) {
        case '9to5':
        case 'traditional':
          if (isWeekday) {
            // Check for custom break time boost first
            let breakTimeBoostApplied = false;
            if (this.userProfile.breakTime) {
              const breakTimeBoost = this.calculateBreakTimeBoost(currentMinute);
              if (breakTimeBoost > 0) {
                timeScore = Math.min(timeScore + breakTimeBoost, 100);
                breakTimeBoostApplied = true;
              }
            }
            
            // Only apply other work hour adjustments if break time boost wasn't applied
            if (!breakTimeBoostApplied) {
              // During work hours (9-5) - lower readiness
              if (currentTime >= 9 && currentTime <= 17) {
                timeScore = Math.max(timeScore * 0.3, 20); // Significantly reduce
              }
              // After work (5+ PM) - boost readiness
              else if (currentTime >= 17 && currentTime <= 20) {
                timeScore = Math.min(timeScore + 30, 100);
              }
              // Lunch break (12-1 PM) - moderate boost
              else if (currentTime >= 12 && currentTime <= 13) {
                timeScore = Math.min(timeScore + 15, 90);
              }
            }
          }
          // Weekends - normal scoring
          break;
        case 'night_shift':
          // Adjust for night shift workers
          if (currentTime >= 22 || currentTime <= 6) {
            timeScore = Math.max(timeScore * 0.4, 25); // Working hours
          } else if (currentTime >= 8 && currentTime <= 14) {
            timeScore = Math.min(timeScore + 25, 100); // Post-shift rest
          }
          break;
        case 'flexible':
        case 'student':
          // More flexible, slight boost during traditional off-hours
          if (currentTime >= 14 && currentTime <= 18) {
            timeScore = Math.min(timeScore + 10, 95);
          }
          break;
        case 'other':
        case 'not_working':
        case 'other/notworking':
        case 'other_/_not_working':
        case 'other_not_working':
          // Not working - boost readiness during preferred times (matching UI ranges + 1hr leniency)
          if (this.userProfile.napTiming) {
            const timings = Array.isArray(this.userProfile.napTiming) ? this.userProfile.napTiming : [this.userProfile.napTiming];
            
            timings.forEach(timing => {
              if (timing === 'midday') {
                // UI shows "Midday (12–1 PM)" so give leniency from 11 AM to 2 PM
                if (currentTime >= 11 && currentTime <= 14) {
                  timeScore = Math.min(timeScore + 20, 100);
                }
              } else if (timing === 'afternoon') {
                // UI shows "Afternoon (2–4 PM)" so give leniency from 1 PM to 5 PM  
                if (currentTime >= 13 && currentTime <= 17) {
                  timeScore = Math.min(timeScore + 20, 100);
                }
              } else if (timing === 'evening') {
                // UI shows "Evening (5–6 PM)" so give leniency from 4 PM to 7 PM
                if (currentTime >= 16 && currentTime <= 19) {
                  timeScore = Math.min(timeScore + 20, 100);
                }
              } else if (timing === 'morning') {
                // UI shows "Late morning (10–11 AM)" so give leniency from 9 AM to 12 PM
                if (currentTime >= 9 && currentTime <= 12) {
                  timeScore = Math.min(timeScore + 20, 100);
                }
              }
            });
          }
          break;
        }
      });
    }

    // 3. GOAL-BASED ADJUSTMENT (with diminishing returns)
    if (this.userProfile.goals && this.userProfile.goals.length > 0) {
      // Collect all applicable goal boosts
      const goalBoosts = [];
      
      if (this.userProfile.goals.includes('midday_recharge')) {
        // Boost midday scores significantly (UI shows 12-1 PM, so 11 AM to 2 PM with leniency)
        if (currentTime >= 11 && currentTime <= 14) {
          goalBoosts.push({ name: 'midday_recharge', boost: 25 });
        }
      }
      if (this.userProfile.goals.includes('post_activity_recovery')) {
        // Boost post-activity recovery scores (late afternoon/evening)
        if (currentTime >= 16 && currentTime <= 21) {
          goalBoosts.push({ name: 'post_activity_recovery', boost: 25 });
        }
      }
      if (this.userProfile.goals.includes('mood_focus_enhancement')) {
        // Boost midday and early afternoon for optimal cognitive performance
        if (currentTime >= 12 && currentTime <= 16) {
          goalBoosts.push({ name: 'mood_focus_enhancement', boost: 10 });
        }
      }
      if (this.userProfile.goals.includes('stress_anxiety_reduction')) {
        // Boost stress-relief nap times (midday and late afternoon)
        if ((currentTime >= 12 && currentTime <= 15) || (currentTime >= 16 && currentTime <= 18)) {
          goalBoosts.push({ name: 'stress_anxiety_reduction', boost: 5 });
        }
      }
       if (this.userProfile.goals.includes('night_sleep_improvement')) {
        // Reduce readiness as you get closer to bedtime to help fall asleep faster at night
        if (this.userProfile.bedtime) {
          const bedtimeStr = this.userProfile.bedtime;
          const bedtimeHour = this.parseTimeToHour(bedtimeStr);
          
          // Calculate hours before bedtime
          let hoursUntilBedtime = bedtimeHour - currentTime;
          if (hoursUntilBedtime < 0) {
            hoursUntilBedtime += 24; // Handle next day bedtime
          }
          
          // Apply penalties based on proximity to bedtime (negative boosts)
          if (hoursUntilBedtime <= 2) {
            // Within 2 hours of bedtime - significant penalty
            goalBoosts.push({ name: 'night_sleep_improvement', boost: -40, hours: hoursUntilBedtime });
          } else if (hoursUntilBedtime <= 4) {
            // Within 4 hours of bedtime - moderate penalty  
            goalBoosts.push({ name: 'night_sleep_improvement', boost: -25, hours: hoursUntilBedtime });
          } else if (hoursUntilBedtime <= 6) {
            // Within 6 hours of bedtime - mild penalty
            goalBoosts.push({ name: 'night_sleep_improvement', boost: -10, hours: hoursUntilBedtime });
          }
          // No penalty if more than 6 hours before bedtime
        }
      }
      
      // Apply diminishing returns: sort by boost size (largest first, penalties last)
      goalBoosts.sort((a, b) => b.boost - a.boost);
      
      // Apply boosts with diminishing returns
      goalBoosts.forEach((goal, index) => {
        let actualBoost = goal.boost;
        if (index > 0 && goal.boost > 0) {
          // Only halve positive boosts, not penalties
          actualBoost = Math.round(goal.boost / 2);
          console.log(`${goal.name}: ${goal.boost} → ${actualBoost} points (halved)`);
        } else {
          if (goal.name === 'night_sleep_improvement') {
            console.log(`${goal.name}: ${goal.hours.toFixed(1)}h until bedtime, ${actualBoost} points`);
          } else {
            console.log(`${goal.name}: ${actualBoost} points (full)`);
          }
        }
        timeScore = Math.max(Math.min(timeScore + actualBoost, 100), 10);
      });
    }

    // Add general time-of-day penalties for very bad nap times (skip for night shift workers)
    const schedules = Array.isArray(this.userProfile.dailySchedule) ? this.userProfile.dailySchedule : [this.userProfile.dailySchedule];
    const isNightShiftWorker = schedules.includes('night_shift');
    
    if (!isNightShiftWorker) {
      if (currentTime >= 1 && currentTime < 6) {
        // Deep sleep hours - absolutely terrible for napping
        timeScore -= 40;
        console.log('Deep sleep hours penalty: -40 points');
      } else if (currentTime >= 6 && currentTime < 9) {
        // Early morning - not great for napping
        timeScore -= 15;
        console.log('Early morning penalty: -15 points');
      } else if (currentTime >= 20.5 && currentTime < 23) {
        // Evening - moderate penalty
        timeScore -= 10;
        console.log('Evening penalty: -10 points');
      } else if (currentTime >= 23 || currentTime < 1) {
        // Late night/very early morning - terrible for napping
        timeScore -= 30;
        console.log('Late night penalty: -30 points');
      }
    } else {
      console.log('Night shift worker - skipping time-of-day penalties');
    }

    console.log('Final time score before clamp:', timeScore);
    return Math.max(10, Math.min(100, timeScore));
  }

  // Break Time Boost Calculation
  calculateBreakTimeBoost(currentMinute) {
    if (!this.userProfile.breakTime) {
      return 0;
    }

    // Parse the break time (format: "12:30 PM")
    const breakTimeMatch = this.userProfile.breakTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!breakTimeMatch) {
      return 0;
    }

    let breakHour = parseInt(breakTimeMatch[1]);
    const breakMinute = parseInt(breakTimeMatch[2]);
    const period = breakTimeMatch[3].toUpperCase();

    // Convert to 24-hour format
    if (period === 'PM' && breakHour !== 12) {
      breakHour += 12;
    } else if (period === 'AM' && breakHour === 12) {
      breakHour = 0;
    }

    // Convert break time to total minutes since midnight
    const breakTotalMinutes = breakHour * 60 + breakMinute;

    // Boost window: 15 minutes before to 45 minutes after break time (60 minute total window)
    const boostStartMinutes = breakTotalMinutes - 15;
    const boostEndMinutes = breakTotalMinutes + 45;

    // Check if current time is within the boost window
    if (currentMinute >= boostStartMinutes && currentMinute <= boostEndMinutes) {
      const currentHour = Math.floor(currentMinute / 60);
      const currentMinuteComponent = currentMinute % 60;
      console.log(`🍃 Break time boost applied! Break: ${this.userProfile.breakTime}, Current: ${currentHour}:${currentMinuteComponent.toString().padStart(2, '0')}`);
      return 30; // 30-point boost
    }

    return 0;
  }

  calculateCircadianAlignment() {
    let circadianScore = 50; // Base score

    // If user has a strong timing preference, start with good baseline
    if (this.userProfile.napTiming) {
      const timings = Array.isArray(this.userProfile.napTiming) ? this.userProfile.napTiming : [this.userProfile.napTiming];
      const hasNonFlexibleTiming = timings.some(timing => 
        !timing.toLowerCase().includes('flexible') && 
        !timing.toLowerCase().includes('whenever_i_feel_tired')
      );
      if (hasNonFlexibleTiming) {
        circadianScore = 75; // Good baseline when following user preference
      }
    }

    // Factor in Nappin AI data for more sophisticated circadian assessment
    
    // 1. HEART RATE ANALYSIS (indicates current arousal/stress state)
    if (this.userProfile.restingHeartRate) {
      const heartRate = parseInt(this.userProfile.restingHeartRate);
      let hrAdjustment = 0;
      if (heartRate < 60) {
        hrAdjustment = 15; // Very relaxed, good for napping
      } else if (heartRate < 70) {
        hrAdjustment = 10; // Relaxed
      } else if (heartRate < 80) {
        hrAdjustment = 5; // Normal
      } else if (heartRate < 90) {
        hrAdjustment = -5; // Slightly elevated
      } else {
        hrAdjustment = -15; // High stress/activity state
      }
      circadianScore += hrAdjustment;
      console.log(`Heart rate ${heartRate} BPM: ${hrAdjustment > 0 ? '+' : ''}${hrAdjustment} points`);
    }

    // 2. SLEEP QUALITY INDICATORS
    if (this.userProfile.sleeperType) {
      let sleepAdjustment = 0;
      switch (this.userProfile.sleeperType.toLowerCase()) {
        case 'deep':
        case 'heavy sleeper':
        case 'heavy':
          sleepAdjustment = 10; // Good natural sleep, likely good circadian rhythm
          break;
        case 'light':
        case 'light sleeper':
          sleepAdjustment = -5; // May indicate circadian disruption
          break;
        case 'average':
          sleepAdjustment = 0; // No adjustment
          break;
      }
      circadianScore += sleepAdjustment;
      console.log(`Sleep type "${this.userProfile.sleeperType}": ${sleepAdjustment > 0 ? '+' : ''}${sleepAdjustment} points`);
    }

    // 3. SLEEP DIFFICULTY (from Nappin AI analysis)
    if (this.userProfile.difficultyFallingAsleep !== undefined) {
      const difficulty = parseFloat(this.userProfile.difficultyFallingAsleep);
      let difficultyAdjustment = 0;
      if (difficulty < 0.3) {
        difficultyAdjustment = 10; // Easy sleeper, good circadian rhythm
      } else if (difficulty > 0.7) {
        difficultyAdjustment = -10; // Difficulty sleeping, may indicate circadian issues
      }
      circadianScore += difficultyAdjustment;
      console.log(`Sleep difficulty ${difficulty.toFixed(2)}: ${difficultyAdjustment > 0 ? '+' : ''}${difficultyAdjustment} points`);
    }

    // 4. SLEEP DURATION vs CIRCADIAN NEED
    if (this.userProfile.sleepDuration) {
      const duration = parseFloat(this.userProfile.sleepDuration);
      let durationAdjustment = 0;
      if (duration < 6) {
        durationAdjustment = 15; // Sleep deprived, higher nap need
      } else if (duration < 7) {
        durationAdjustment = 8; // Slightly under-rested
      } else if (duration > 9) {
        durationAdjustment = -8; // May be over-rested, less nap need
      }
      circadianScore += durationAdjustment;
      console.log(`Sleep duration ${duration}h: ${durationAdjustment > 0 ? '+' : ''}${durationAdjustment} points`);
    }

    // 5. TIME-BASED CIRCADIAN RHYTHM (if we have sleep schedule data)
    if (this.userProfile.bedtime && this.userProfile.wakeTime) {
      const now = this.debugTimeOverride ? new Date(this.debugTimeOverride) : new Date();
      const currentHour = now.getHours();
      
      // Parse wake time
      const wakeTimeStr = this.userProfile.wakeTime;
      const wakeHour = this.parseTimeToHour(wakeTimeStr);
      
      // Calculate optimal nap window (typically 6-8 hours after waking, with 1-hour leniency)
      const optimalNapStart = (wakeHour + 5.5) % 24; // Start 30 min earlier
      const optimalNapEnd = (wakeHour + 8.5) % 24;   // End 30 min later
      
      if (currentHour >= optimalNapStart && currentHour <= optimalNapEnd) {
        circadianScore += 10; // In optimal window
      } else {
        // Calculate distance from optimal window with more forgiveness
        const distance = Math.min(
          Math.abs(currentHour - optimalNapStart),
          Math.abs(currentHour - optimalNapEnd)
        );
        circadianScore -= Math.min(distance * 2, 10); // Reduced penalty
      }
      
      // HARSH TIME-BASED CIRCADIAN PENALTIES (skip for night shift workers)
      const schedules = Array.isArray(this.userProfile.dailySchedule) ? this.userProfile.dailySchedule : [this.userProfile.dailySchedule];
      const isNightShiftWorker = schedules.includes('night_shift');
      
      if (!isNightShiftWorker) {
        if (currentHour >= 1 && currentHour < 6) {
          // Deep sleep hours - circadian rhythm strongly opposes napping
          circadianScore -= 40;
          console.log('Circadian deep sleep penalty: -40 points');
        } else if (currentHour >= 6 && currentHour < 9) {
          // Right after waking - cortisol spike, bad for naps
          circadianScore -= 20;
          console.log('Circadian morning cortisol penalty: -20 points');
        } else if (currentHour >= 23 || currentHour < 1) {
          // Late night/very early - circadian disruption
          circadianScore -= 25;
          console.log('Circadian late night penalty: -25 points');
        }
      } else {
        console.log('Night shift worker - skipping circadian time penalties');
      }
    }

    return Math.max(30, Math.min(100, circadianScore));
  }

  // Helper method to parse time strings like "9:30 AM"
  parseTimeToHour(timeString) {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours + (minutes || 0) / 60;
  }



  calculateTimingConflict(workoutRecoveryStart, workoutRecoveryEnd) {
    // Check how workout recovery window aligns with user's preferred nap timing
    if (!this.userProfile.napTiming) {
      return 0.8; // No timing preference set, moderate boost since user hasn't specified they like this time
    }

    const timings = Array.isArray(this.userProfile.napTiming) ? this.userProfile.napTiming : [this.userProfile.napTiming];
    let hasAlignment = false;
    let hasConflict = false;

    timings.forEach(timing => {
      let preferredStart, preferredEnd;
      
      switch (timing) {
        case 'morning':
          preferredStart = 9;
          preferredEnd = 12;
          break;
        case 'midday':
        case 'afternoon':
          preferredStart = 12;
          preferredEnd = 15;
          break;
        case 'evening':
          preferredStart = 17;
          preferredEnd = 20;
          break;
        case 'flexible':
        case 'whenever_i_feel_tired':
          hasAlignment = true; // Flexible users get full benefit
          return;
        default:
          return;
      }

      // Check if workout recovery window overlaps with preferred nap timing
      if (workoutRecoveryStart < preferredEnd && workoutRecoveryEnd > preferredStart) {
        // Calculate overlap percentage
        const overlapStart = Math.max(workoutRecoveryStart, preferredStart);
        const overlapEnd = Math.min(workoutRecoveryEnd, preferredEnd);
        const overlapHours = overlapEnd - overlapStart;
        const recoveryWindowHours = workoutRecoveryEnd - workoutRecoveryStart;
        const overlapPercentage = overlapHours / recoveryWindowHours;

        if (overlapPercentage > 0.5) {
          // Good alignment - recovery window mostly within preferred nap time
          hasAlignment = true;
          console.log(`✅ Workout recovery (${workoutRecoveryStart.toFixed(1)}-${workoutRecoveryEnd.toFixed(1)}) aligns well with ${timing} nap preference (${preferredStart}-${preferredEnd})`);
        } else {
          // Partial overlap but mostly conflict
          hasConflict = true;
          console.log(`⚠️ Workout recovery (${workoutRecoveryStart.toFixed(1)}-${workoutRecoveryEnd.toFixed(1)}) partially conflicts with ${timing} nap preference (${preferredStart}-${preferredEnd})`);
        }
      } else {
        // No overlap - user doesn't prefer napping during recovery time
        console.log(`❌ Workout recovery (${workoutRecoveryStart.toFixed(1)}-${workoutRecoveryEnd.toFixed(1)}) doesn't align with ${timing} nap preference (${preferredStart}-${preferredEnd})`);
      }
    });

    // Return multiplier based on alignment
    if (hasAlignment) {
      return 1.0; // Full boost - recovery time aligns with preferred nap timing
    } else if (hasConflict) {
      return 0.5; // Significant reduction - direct conflict with preferred timing
    } else {
      return 0.7; // Moderate reduction - user simply doesn't prefer napping during recovery time
    }
  }

  calculateWorkoutRecoveryBoost() {
    // Only apply boost if user has selected "Recover after activity" goal and has a workout time
    const hasRecoveryGoal = this.userProfile.goals && this.userProfile.goals.includes('post_activity_recovery');
    if (!hasRecoveryGoal || !this.userProfile.workoutTime) {
      return 0;
    }

    const now = this.debugTimeOverride ? new Date(this.debugTimeOverride) : new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;

    // Handle 'varies' workout time - no specific boost timing
    if (this.userProfile.workoutTime === 'varies') {
      console.log('🏋️ Workout time varies - no specific recovery boost applied');
      return 0;
    }

    const workoutHour = this.userProfile.workoutTime;
    
    // Check if user has a 9-5 job and works out in the morning before work
    const schedules = Array.isArray(this.userProfile.dailySchedule) ? this.userProfile.dailySchedule : [this.userProfile.dailySchedule];
    const has9to5Job = schedules && schedules.includes('9to5');
    
    if (has9to5Job && workoutHour >= 6 && workoutHour <= 9) {
      // Working out before a 9-5 job - they'll be at work during recovery time, no boost
      console.log('🏋️ Morning workout before 9-5 job - no recovery boost (will be at work)');
      return 0;
    }

    // Calculate recovery window: workout time + 1.5 hours for activity + shower
    const recoveryStartHour = workoutHour + 1.5;
    const recoveryStartMinutes = recoveryStartHour * 60;
    const recoveryEndMinutes = recoveryStartMinutes + 60; // 1 hour boost duration

    // Check for conflict with user's preferred nap timing
    const conflictReduction = this.calculateTimingConflict(recoveryStartHour, recoveryStartHour + 1);

    let boost = 0;

    // Check if we're in the recovery boost window
    if (currentTimeInMinutes >= recoveryStartMinutes && currentTimeInMinutes <= recoveryEndMinutes) {
      // We're in the peak recovery window - apply boost
      const timeIntoBoost = currentTimeInMinutes - recoveryStartMinutes;
      const boostProgress = timeIntoBoost / 60; // 0 to 1 over the hour
      
      // Start strong and taper off gradually
      if (boostProgress <= 0.42) {
        // First 25 minutes - peak boost
        boost = 25;
      } else if (boostProgress <= 0.83) {
        // Middle 25 minutes - strong boost  
        boost = 20;
      } else {
        // Final 15 minutes - moderate boost tapering down
        boost = 15 - (boostProgress - 0.83) * 29.4; // Taper from 15 to 10
      }
      
      // Apply conflict reduction if workout recovery conflicts with preferred nap timing
      boost *= conflictReduction;
      
      const conflictMessage = conflictReduction < 1 ? ` (reduced ${((1 - conflictReduction) * 100).toFixed(0)}% due to nap timing conflict)` : '';
      console.log(`🏋️ Post-workout recovery boost: ${boost.toFixed(1)} points (${(boostProgress * 100).toFixed(1)}% through recovery window)${conflictMessage}`);
    } else if (currentTimeInMinutes < recoveryStartMinutes) {
      // Before recovery window
      const minutesUntilRecovery = recoveryStartMinutes - currentTimeInMinutes;
      if (minutesUntilRecovery <= 30) {
        // Small anticipatory boost in the 30 minutes before recovery window
        boost = 5 * conflictReduction;
        const conflictMessage = conflictReduction < 1 ? ` (reduced due to nap timing conflict)` : '';
        console.log(`🏋️ Pre-recovery anticipation boost: ${boost.toFixed(1)} points (${minutesUntilRecovery} min until recovery)${conflictMessage}`);
      }
    } else {
      // After recovery window - small residual benefit for next 30 minutes
      const minutesAfterRecovery = currentTimeInMinutes - recoveryEndMinutes;
      if (minutesAfterRecovery <= 30) {
        boost = (8 - (minutesAfterRecovery / 30) * 8) * conflictReduction; // Taper from 8 to 0, with conflict reduction
        const conflictMessage = conflictReduction < 1 ? ` (reduced due to nap timing conflict)` : '';
        console.log(`🏋️ Post-recovery residual boost: ${boost.toFixed(1)} points (${minutesAfterRecovery} min after recovery)${conflictMessage}`);
      }
    }

    return Math.max(0, Math.min(25, boost)); // Cap boost at 25 points
  }

  calculatePersonalFactors() {
    const now = this.debugTimeOverride ? new Date(this.debugTimeOverride) : new Date();
    const currentHour = now.getHours();
    
    let personalScore = 50; // Base score

    // Stress level impact
    if (this.userProfile.stressLevel) {
      switch (this.userProfile.stressLevel) {
        case 'low':
          personalScore += 20;
          break;
        case 'medium':
          personalScore += 10;
          break;
        case 'high':
          personalScore -= 10;
          break;
      }
    }

    // Activity level impact
    if (this.userProfile.activityLevel) {
      switch (this.userProfile.activityLevel) {
        case 'low':
          personalScore += 15;
          break;
        case 'moderate':
          personalScore += 10;
          break;
        case 'high':
          personalScore -= 5;
          break;
      }
    }

    // Sleep duration impact
    if (this.userProfile.sleepDuration) {
      const duration = parseFloat(this.userProfile.sleepDuration);
      if (duration < 6) {
        personalScore += 25; // Need more rest
      } else if (duration < 7) {
        personalScore += 15;
      } else if (duration > 9) {
        personalScore -= 10; // May be over-rested
      }
    }

    // Workout recovery boost
    const workoutBoost = this.calculateWorkoutRecoveryBoost();
    personalScore += workoutBoost;

    // TIME-BASED PERSONAL FACTOR PENALTIES (skip for night shift workers)
    // Personal factors matter less during biologically terrible times
    const schedules = Array.isArray(this.userProfile.dailySchedule) ? this.userProfile.dailySchedule : [this.userProfile.dailySchedule];
    const isNightShiftWorker = schedules.includes('night_shift');
    
    if (!isNightShiftWorker) {
      if (currentHour >= 1 && currentHour < 6) {
        // Deep sleep hours - personal factors can't overcome biology
        personalScore *= 0.4; // Reduce to 40% effectiveness
        console.log('Personal factors reduced to 40% during deep sleep hours');
      } else if (currentHour >= 6 && currentHour < 9) {
        // Early morning - somewhat reduced
        personalScore *= 0.7; // Reduce to 70% effectiveness
        console.log('Personal factors reduced to 70% during early morning');
      } else if (currentHour >= 23 || currentHour < 1) {
        // Late night/very early - reduced effectiveness
        personalScore *= 0.6; // Reduce to 60% effectiveness
        console.log('Personal factors reduced to 60% during late night hours');
      }
    } else {
      console.log('Night shift worker - skipping personal factor time penalties');
    }

    return Math.max(0, Math.min(100, personalScore));
  }

  recalculateReadiness() {
    // Calculate individual factors
    const currentMinute = this.getCurrentMinutesSinceMidnight();
    this.userProfile.timeBasedReadiness = this.calculateTimeBasedReadiness(currentMinute);
    this.userProfile.circadianAlignment = this.calculateCircadianAlignment();
    this.userProfile.personalFactors = this.calculatePersonalFactors();

    // Debug logging
    console.log('🚨 === READINESS CALCULATION DEBUG === 🚨');
    const debugTime = this.debugTimeOverride ? new Date(this.debugTimeOverride) : new Date();
    console.log('⏰ Current time:', debugTime.getHours(), this.debugTimeOverride ? '(DEBUG OVERRIDE)' : '(REAL)');
    console.log('🎯 Goals:', this.userProfile.goals);
    console.log('📅 Nap timing:', this.userProfile.napTiming);
    console.log('💼 Daily schedule:', this.userProfile.dailySchedule);
    console.log('🛏️ Bedtime:', this.userProfile.bedtime);
    console.log('⏰ Wake time:', this.userProfile.wakeTime);
    console.log('😰 Stress level:', this.userProfile.stressLevel);
    console.log('🏃 Activity level:', this.userProfile.activityLevel);
    console.log('💤 Sleep duration:', this.userProfile.sleepDuration);
    console.log('🏋️ Workout time:', this.userProfile.workoutTime);
    console.log('📊 SCORES:');
    console.log('  📈 Time-based (55%):', this.userProfile.timeBasedReadiness);
    console.log('  🌙 Circadian (25%):', this.userProfile.circadianAlignment);
    console.log('  👤 Personal (20%):', this.userProfile.personalFactors);

    // Weighted average of all factors - heavily favor user preferences
    const weights = {
      time: 0.55,      // Time/schedule preferences are most important
      circadian: 0.25, // Circadian rhythm + biometric data
      personal: 0.20     // Personal factors (increased importance)
    };

    const calculation = 
      (this.userProfile.timeBasedReadiness * weights.time) +
      (this.userProfile.circadianAlignment * weights.circadian) +
      (this.userProfile.personalFactors * weights.personal);
    
    this.userProfile.overallReadiness = Math.round(calculation);
    
    console.log('🧮 FINAL CALCULATION:');
    console.log(`  (${this.userProfile.timeBasedReadiness} × 0.55) + (${this.userProfile.circadianAlignment} × 0.25) + (${this.userProfile.personalFactors} × 0.20)`);
    console.log(`  = ${this.userProfile.timeBasedReadiness * weights.time} + ${this.userProfile.circadianAlignment * weights.circadian} + ${this.userProfile.personalFactors * weights.personal}`);
    console.log(`  = ${calculation.toFixed(2)} → ${this.userProfile.overallReadiness}%`);
    console.log('🚨 === END DEBUG === 🚨');

    return this.userProfile.overallReadiness;
  }

  // Get current readiness score
  getReadinessScore() {
    return this.userProfile.overallReadiness;
  }

  // Get complete user profile
  getUserProfile() {
    return { ...this.userProfile };
  }

  // Reset all data
  reset() {
    this.userProfile = {
      goals: [],
      wellnessFocus: null,
      napEnvironment: null,
      napTiming: null,
      dailySchedule: null,
      preferredDevice: null,
      sleepDuration: null,
      bedtime: null,
      wakeTime: null,
      workSchedule: null,
      activityLevel: null,
      stressLevel: null,
      sleepLatencyLow: null,
      sleepLatencyHigh: null,
      sleepLatencyValue: null,
      difficultyFallingAsleep: null,
      restingHeartRate: null,
      sleeperType: null,
      timeBasedReadiness: 0,
      circadianAlignment: 0,
      personalFactors: 0,
      overallReadiness: 0
    };
  }

  // Debug method to set a specific time for testing
  setDebugTime(hour, minute = 0) {
    const debugDate = new Date();
    debugDate.setHours(hour, minute, 0, 0);
    this.debugTimeOverride = debugDate.getTime();
    console.log(`🕐 DEBUG: Time set to ${hour}:${minute.toString().padStart(2, '0')}`);
  }

  // Clear debug time override
  clearDebugTime() {
    this.debugTimeOverride = null;
    console.log('🕐 DEBUG: Using real time again');
    console.log('🕐 DEBUG: debugTimeOverride is now:', this.debugTimeOverride);
  }
}

// Create singleton instance
const userPersonalization = new UserPersonalizationManager();

module.exports = userPersonalization;