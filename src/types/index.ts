import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IProjectResponse {
  Description: string;
  Name: string;
  website_url: string;
  appstore_url?: string;
  google_play_url?: string;
}

export interface IProject
  extends Omit<IProjectResponse, "Description" | "Name"> {
  name: string;
  description: string;
}

export type RootStackParamList = {
  Home: undefined;
  ProjectInformation: {
    project: IProject;
  };
};

export type TNavigationFunc = NativeStackNavigationProp<RootStackParamList>;
