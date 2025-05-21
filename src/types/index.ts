import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ViewStyle } from "react-native";

interface IImage {
  url: string;
  id: number;
  name: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
}

export interface IProjectResponse {
  Description: string;
  Name: string;
  website_url: string;
  appstore_url?: string;
  google_play_url?: string;
  image: IImage | null;
}

export interface IProject
  extends Omit<IProjectResponse, "Description" | "Name"> {
  name: string;
  description: string;
  imageUrl: string;
}

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  ProjectInformation: {
    project: IProject;
  };
  About: undefined;
};

export type TNavigationFunc = NativeStackNavigationProp<RootStackParamList>;

export type TStyle = ViewStyle | ViewStyle[];
