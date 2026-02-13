import { Text, View, ScrollView } from "react-native";
import * as Application from "expo-application";

import { Header, Screen } from "#components";
import { TNavigationFunc } from "#types";

export const AboutScreen = ({
  navigation,
}: {
  navigation: TNavigationFunc;
}) => {
  const appVersion = Application.nativeApplicationVersion;

  return (
    <Screen>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Header
            text="About UNICEF Romania"
            handleGoBack={() => navigation.goBack()}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: 24,
              textAlign: "center",
              marginHorizontal: 20,
            }}
          >
            Support. Share. Make a Difference
          </Text>
          <Text style={{ marginTop: 24, marginHorizontal: 20 }}>
            The UNICEF in Romania app is your go-to platform for quick and easy
            access to the most useful resources developed for children,
            adolescents, parents, and professionals working with and for
            children. Whether you're looking for trusted information, want to
            make your voice heard, or need support during key moments in your
            life, this app connects you directly with reliable and verified
            solutions.{"\n"}
            {"\n"}
            <Text>What will you find in the app?{"\n"}</Text>
            {"\n"}
            <Text>
              This platform serves as a central digital hub, allowing you to
              easily access other apps and initiatives developed by UNICEF and
              its partners. Included resources: U-Report – a civic engagement
              platform for adolescents and young people to express their views
              on important issues and actively contribute to change in their
              communities.{"\n\n"}UMatter+ – a mental health support app for
              adolescents, offering practical tools and information to better
              understand your emotions and take care of yourself and those
              around you.{"\n\n"}Bebbo – a mobile app for parents and
              caregivers, offering personalized advice on childcare,
              development, and child health.{"\n\n"}For everyone, everywhere The
              UNICEF Romania app is designed to be helpful for all, whether
              you're a teenager, parent, teacher, NGO staff member or public
              sector professional. The information is free, easy to understand,
              tailored to different needs, and constantly updated.{"\n\n"}
              Download the app and explore a digital space created especially
              for you.{"\n\n"}UNICEF is present in Romania and in over 190
              countries and territories, working to promote the survival and
              development of children from early childhood through adolescence.
              In Romania, UNICEF works alongside key actors such as the
              Government, Parliament, local authorities, civil society, the
              private sector, national and international partners, and the media
              to ensure access to quality early education and schooling for all
              children, to protect adolescents and monitor children’s rights, to
              strengthen social protection, and to mobilize resources in support
              of children.
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              maxWidth: "95%",
              marginTop: 20,
            }}
          >
            App Version {appVersion}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
};
