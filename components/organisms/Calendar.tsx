import { lightColors as colors } from "@/theme/colors";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export type CalendarMonth = {
  name: string;
  days: Array<{
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
  }>;
};

export interface CalendarProps {
  months: CalendarMonth[];
  onSelectDate?: (date: string) => void;
  style?: object;
}

const Calendar: React.FC<CalendarProps> = ({ months, onSelectDate, style }) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.calendarGridScroll, { flexGrow: 1 }]}
      horizontal={false}
      style={{ width: "100%" }}
    >
      <View
        style={[
          styles.calendarGrid,
          { width: "100%", flexWrap: "wrap", justifyContent: "space-between" },
        ]}
      >
        {months.map((month) => (
          <View
            key={month.name}
            style={[
              styles.monthSection,
              { flexBasis: "24%", minWidth: 0, maxWidth: "100%" },
            ]}
          >
            <Text style={styles.monthTitle}>{month.name}</Text>
            <View style={styles.weekdaysRow}>
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <Text key={d + i} style={styles.weekday}>
                  {d}
                </Text>
              ))}
            </View>
            <View style={styles.daysGrid}>
              {(() => {
                const firstCurrentIdx = month.days.findIndex(
                  (d) => d.isCurrentMonth
                );
                const firstCurrent =
                  month.days[firstCurrentIdx] || month.days[0];
                let offset = 0;
                if (firstCurrent && firstCurrent.isCurrentMonth) {
                  const [year, monthNum, dayNum] = firstCurrent.date
                    .split("-")
                    .map(Number);
                  const jsDate = new Date(year, monthNum - 1, dayNum);
                  let weekday = jsDate.getDay();
                  offset = weekday === 0 ? 6 : weekday - 1;
                }
                const days = [];
                for (let i = 0; i < offset; i++) {
                  days.push(<View key={`empty-${i}`} style={styles.dayBtn} />);
                }
                days.push(
                  ...month.days.map((day, dayIdx) => {
                    const gridIdx = offset + dayIdx;
                    const isFirstRow = gridIdx < 7;
                    const isLastRow =
                      gridIdx >=
                      Math.floor((offset + month.days.length - 1) / 7) * 7;
                    return (
                      <Pressable
                        key={day.date}
                        style={[
                          styles.dayBtn,
                          day.isCurrentMonth
                            ? styles.dayCurrentMonth
                            : styles.dayOtherMonth,
                          isFirstRow && gridIdx % 7 === 0 && styles.dayTopLeft,
                          isFirstRow && gridIdx % 7 === 6 && styles.dayTopRight,
                          isLastRow &&
                            gridIdx % 7 === 0 &&
                            styles.dayBottomLeft,
                          isLastRow &&
                            gridIdx % 7 === 6 &&
                            styles.dayBottomRight,
                        ]}
                        onPress={() => onSelectDate?.(day.date)}
                        accessibilityLabel={`Select ${day.date}`}
                      >
                        <View
                          style={[
                            styles.dayInner,
                            day.isToday && styles.dayToday,
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayText,
                              day.isToday && styles.dayTodayText,
                            ]}
                          >
                            {parseInt(day.date.split("-")[2], 10)}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })
                );
                const total = offset + month.days.length;
                const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
                for (let i = 0; i < trailing; i++) {
                  days.push(
                    <View key={`trailing-${i}`} style={styles.dayBtn} />
                  );
                }
                return days;
              })()}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendarGridScroll: {
    padding: 16,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
    gap: 0,
  },
  monthSection: {
    flexGrow: 1,
    flexBasis: "24%",
    minWidth: 0,
    maxWidth: "100%",
    marginBottom: 24,
    alignItems: "center",
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
    gap: 0,
  },
  weekday: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    textAlign: "center",
    minWidth: 32,
    maxWidth: 32,
    height: 28,
    lineHeight: 28,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.borderDefault,
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    marginTop: 2,
    gap: 0,
  },
  dayBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    backgroundColor: colors.surfaceBackground,
    margin: 0,
    padding: 0,
  },
  dayCurrentMonth: {
    backgroundColor: colors.surfaceBackground,
  },
  dayOtherMonth: {
    backgroundColor: colors.surfaceSubtle,
  },
  dayTopLeft: {
    borderTopLeftRadius: 8,
  },
  dayTopRight: {
    borderTopRightRadius: 8,
  },
  dayBottomLeft: {
    borderBottomLeftRadius: 8,
  },
  dayBottomRight: {
    borderBottomRightRadius: 8,
  },
  dayInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  dayToday: {
    backgroundColor: colors.brandPrimary,
  },
  dayText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  dayTodayText: {
    color: colors.textInverse,
    fontWeight: "700",
  },
});

export default Calendar;
