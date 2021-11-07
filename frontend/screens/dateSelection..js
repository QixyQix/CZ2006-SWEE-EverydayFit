import { Layout } from "@ui-kitten/components";
import React from "react";

import MyCalendar from "../components/calendar";

export default function dateSelectScreen() {
  return (
    <>
      <Layout>
        <Layout>
          <MyCalendar />
        </Layout>
      </Layout>
    </>
  );
}
