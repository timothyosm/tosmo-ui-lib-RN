import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Switch from "@/components/atoms/Switch";
import Calendar, { CalendarMonth } from "@/components/organisms/Calendar";
import Card from "@/components/organisms/Card";
import Dialog from "@/components/organisms/Dialog";
import Navbar from "@/components/organisms/Navbar";
import { SidebarNavItem, SidebarTeam } from "@/components/organisms/Sidebar";
import Toast from "@/components/organisms/Toast";
import { useCheckboxListExample } from "@/hooks/useCheckboxListExample";
import { useRadioListExample } from "@/hooks/useRadioListExample";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { EnvelopeIcon, PlusIcon } from "react-native-heroicons/solid";

const months: CalendarMonth[] = [
  {
    name: "January",
    days: [
      { date: "2021-12-27" },
      { date: "2021-12-28" },
      { date: "2021-12-29" },
      { date: "2021-12-30" },
      { date: "2021-12-31" },
      { date: "2022-01-01", isCurrentMonth: true },
      { date: "2022-01-02", isCurrentMonth: true },
      { date: "2022-01-03", isCurrentMonth: true },
      { date: "2022-01-04", isCurrentMonth: true },
      { date: "2022-01-05", isCurrentMonth: true },
      { date: "2022-01-06", isCurrentMonth: true },
      { date: "2022-01-07", isCurrentMonth: true },
      { date: "2022-01-08", isCurrentMonth: true },
      { date: "2022-01-09", isCurrentMonth: true },
      { date: "2022-01-10", isCurrentMonth: true },
      { date: "2022-01-11", isCurrentMonth: true },
      { date: "2022-01-12", isCurrentMonth: true, isToday: true },
      { date: "2022-01-13", isCurrentMonth: true },
      { date: "2022-01-14", isCurrentMonth: true },
      { date: "2022-01-15", isCurrentMonth: true },
      { date: "2022-01-16", isCurrentMonth: true },
      { date: "2022-01-17", isCurrentMonth: true },
      { date: "2022-01-18", isCurrentMonth: true },
      { date: "2022-01-19", isCurrentMonth: true },
      { date: "2022-01-20", isCurrentMonth: true },
      { date: "2022-01-21", isCurrentMonth: true },
      { date: "2022-01-22", isCurrentMonth: true },
      { date: "2022-01-23", isCurrentMonth: true },
      { date: "2022-01-24", isCurrentMonth: true },
      { date: "2022-01-25", isCurrentMonth: true },
      { date: "2022-01-26", isCurrentMonth: true },
      { date: "2022-01-27", isCurrentMonth: true },
      { date: "2022-01-28", isCurrentMonth: true },
      { date: "2022-01-29", isCurrentMonth: true },
      { date: "2022-01-30", isCurrentMonth: true },
      { date: "2022-01-31", isCurrentMonth: true },
      { date: "2022-02-01" },
      { date: "2022-02-02" },
      { date: "2022-02-03" },
      { date: "2022-02-04" },
      { date: "2022-02-05" },
      { date: "2022-02-06" },
    ],
  },
  // More months can be added here
];

const sidebarNavigation: SidebarNavItem[] = [
  {
    name: "Dashboard",
    icon: HomeIcon,
    count: "5",
    current: true,
    onPress: () => {},
  },
  { name: "Team", icon: UsersIcon, current: false, onPress: () => {} },
  {
    name: "Projects",
    icon: FolderIcon,
    count: "12",
    current: false,
    onPress: () => {},
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    count: "20+",
    current: false,
    onPress: () => {},
  },
  {
    name: "Documents",
    icon: DocumentDuplicateIcon,
    current: false,
    onPress: () => {},
  },
  { name: "Reports", icon: ChartPieIcon, current: false, onPress: () => {} },
];

const sidebarTeams: SidebarTeam[] = [
  { id: 1, name: "Heroicons", initial: "H", current: false, onPress: () => {} },
  {
    id: 2,
    name: "Tailwind Labs",
    initial: "T",
    current: false,
    onPress: () => {},
  },
  {
    id: 3,
    name: "Workcation",
    initial: "W",
    current: false,
    onPress: () => {},
  },
];

const ExampleScreen: React.FC = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    status: "success" | "error";
    title: string;
    description?: string;
  }>({
    show: false,
    status: "success",
    title: "",
    description: undefined,
  });
  const { items, setItems } = useCheckboxListExample();
  const {
    items: radioItems,
    selectedId,
    setSelectedId,
  } = useRadioListExample();
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [calendarView, setCalendarView] = useState<
    "day" | "week" | "month" | "year"
  >("year");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right", "bottom"]}>
      <Navbar
        navigation={sidebarNavigation}
        teams={sidebarTeams}
        profile={{
          name: "Tom Cook",
          avatarUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          onPress: () => {},
        }}
        onNotificationPress={() => {}}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            backgroundColor: "#F3F4F6",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 24 }}>
            UI Component Examples
          </Text>
          {/* Input Examples */}
          <View style={{ width: 320, marginBottom: 32, gap: 12 }}>
            <Input label="Email" placeholder="you@example.com" />
            <Input
              label="Email"
              placeholder="you@example.com"
              leftIcon={<EnvelopeIcon color="#9ca3af" size={20} />}
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              value="adamwathan"
              error="Not a valid email address."
            />
          </View>
          {/* Card Example */}
          <Card
            header={
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Header</Text>
            }
            body={<Text>This is the body content of the card.</Text>}
            footer={<Text style={{ color: "#6B7280" }}>Footer</Text>}
            style={{ width: 320, marginBottom: 24 }}
          />
          {/* Badge Examples */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <Badge label="Error" color="#ef4444" />
            <Badge label="Success" color="#22c55e" />
            <Badge label="Info" color="#3b82f6" />
          </View>
          Primary Button
        </Button>
        <Button
          size="lg"
          variant="outline"
          onPress={() =>
            setToast({
              show: true,
              status: "error",
              title: "Something went wrong!",
              description: "Please try again later.",
            })
          }
        >
          Secondary Button
        </Button>
        <Button
          shape="circular"
          leftIcon={<PlusIcon color="#fff" size={24} />}
          size="lg"
        >
          {/* Icon only */}
          <Text style={{ width: 0, height: 0 }} />
        </Button>
        {/* Dialog Example */}
        <Dialog
          status="warning"
          visible={dialogVisible}
          title="Payment successful"
          description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis."
          primaryActionLabel="Deactivate"
          onPrimaryAction={() => setDialogVisible(false)}
          secondaryActionLabel="Cancel"
          onSecondaryAction={() => setDialogVisible(false)}
          onClose={() => setDialogVisible(false)}
        />
        <Toast
          show={toast.show}
          status={toast.status}
          title={toast.title}
          description={toast.description}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
        />
        {/* Switch Example */}
        <View style={{ width: 320, marginBottom: 32 }}>
          <Switch
            value={switchEnabled}
            onValueChange={setSwitchEnabled}
            accessibilityLabel="Use setting"
          />
        </View>
        {/* Calendar Example */}
        <View style={{ width: "100%", alignItems: "center", marginBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
            Calendar Example
          </Text>
          <Calendar
            months={months}
            onSelectDate={setSelectedDate}
            style={{ maxWidth: 900, width: "100%" }}
          />
          {selectedDate && (
            <Text style={{ marginTop: 8, color: "#4f46e5" }}>
              Selected date: {selectedDate}
            </Text>
          )}
        </View>
      </ScrollView>
    </Navbar>
  );
};

export default ExampleScreen;
