import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

import { AppText, Header, Screen, StoreButton } from "#components";
import { RootStackParamList } from "#types";
import { useGetComments, useCreateComment } from "#hooks";

type Props = NativeStackScreenProps<RootStackParamList, "ProjectInformation">;

export const ProjectInformationScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const params = route.params;
  const { project } = params;
  const [showWebView, setShowWebView] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const { top } = useSafeAreaInsets();

  const { data: comments, isLoading: commentsLoading } = useGetComments(
    project.documentId
  );
  const createComment = useCreateComment();

  const handleSubmitComment = () => {
    if (!authorName.trim() || !commentText.trim()) return;

    createComment.mutate(
      {
        projectId: project.documentId,
        author: authorName.trim(),
        content: commentText.trim(),
        rating: rating || undefined,
      },
      {
        onSuccess: () => {
          setCommentText("");
          setRating(null);
        },
      }
    );
  };

  const renderStars = (
    currentRating: number | null,
    onPress?: (star: number) => void
  ) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress?.(star)}
            disabled={!onPress}
            activeOpacity={onPress ? 0.7 : 1}
          >
            <Ionicons
              name={
                currentRating && star <= currentRating ? "star" : "star-outline"
              }
              size={onPress ? 28 : 16}
              color={
                currentRating && star <= currentRating ? "#6366F1" : "#ccc"
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleStarPress = (star: number) => {
    setRating(rating === star ? null : star);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Screen>
      <Header text={project.name} handleGoBack={() => navigation.goBack()} />
      <ScrollView
        style={{ paddingBottom: 100 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: project.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <AppText namedStyle="h2" isBold style={styles.title}>
          {project.name}
        </AppText>
        <AppText style={styles.description}>{project.description}</AppText>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <AppText namedStyle="h2" isBold style={styles.commentsTitle}>
            Comments
          </AppText>

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.authorInput}
              placeholder="Your name"
              placeholderTextColor="#999"
              value={authorName}
              onChangeText={setAuthorName}
            />
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              placeholderTextColor="#999"
              value={commentText}
              onChangeText={setCommentText}
              multiline
              numberOfLines={3}
            />
            <View style={styles.ratingInputContainer}>
              <AppText style={styles.ratingLabel}>Rating (optional)</AppText>
              {renderStars(rating, handleStarPress)}
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!authorName.trim() ||
                  !commentText.trim() ||
                  createComment.isPending) &&
                  styles.submitButtonDisabled,
              ]}
              onPress={handleSubmitComment}
              disabled={
                !authorName.trim() ||
                !commentText.trim() ||
                createComment.isPending
              }
            >
              {createComment.isPending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="send" size={16} color="#fff" />
                  <AppText style={styles.submitButtonText}>Post</AppText>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          {commentsLoading ? (
            <ActivityIndicator
              size="large"
              color="#6366F1"
              style={styles.loadingIndicator}
            />
          ) : comments && comments.length > 0 ? (
            <View style={styles.commentsList}>
              {comments.map((comment) => (
                <View key={comment.documentId} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <View style={styles.avatarContainer}>
                      <AppText style={styles.avatarText}>
                        {comment.author?.charAt(0).toUpperCase()}
                      </AppText>
                    </View>
                    <View style={styles.commentMeta}>
                      <AppText isBold style={styles.commentAuthor}>
                        {comment.author}
                      </AppText>
                      <AppText style={styles.commentDate}>
                        {formatDate(comment.createdAt)}
                      </AppText>
                    </View>
                    {comment.rating && (
                      <View style={styles.commentRating}>
                        {renderStars(comment.rating)}
                      </View>
                    )}
                  </View>
                  <AppText style={styles.commentContent}>
                    {comment.content}
                  </AppText>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noComments}>
              <Ionicons name="chatbubble-outline" size={40} color="#ccc" />
              <AppText style={styles.noCommentsText}>
                No comments yet. Be the first to comment!
              </AppText>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.floatingContainer}>
        <View style={styles.storeButtons}>
          {Platform.OS === "android" && project.google_play_url && (
            <StoreButton type="googleplay" url={project.google_play_url} />
          )}
          {Platform.OS === "ios" && project.appstore_url && (
            <StoreButton type="appstore" url={project.appstore_url} />
          )}
          {project.website_url && (
            <StoreButton type="web" url={project.website_url} />
          )}
        </View>

        {project.website_url && (
          <TouchableOpacity
            style={styles.showcaseButton}
            onPress={() => setShowWebView(true)}
          >
            <Ionicons name="eye-outline" size={20} color="#fff" />
            <AppText style={styles.showcaseButtonText}>Showcase App</AppText>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={showWebView}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowWebView(false)}
      >
        <SafeAreaView style={[styles.webViewContainer]}>
          <View style={styles.webViewHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWebView(false)}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            <AppText namedStyle="h2" isBold style={styles.webViewTitle}>
              {project.name}
            </AppText>
            <View style={styles.closeButton} />
          </View>
          <WebView
            source={{ uri: project.website_url! }}
            style={styles.webView}
            startInLoadingState
          />
        </SafeAreaView>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    marginBottom: 10,
    paddingBottom: 200,
  },
  image: {
    width: "100%",
    height: 90,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 20,
  },
  title: {
    marginTop: 24,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 20,
  },
  description: {
    paddingTop: 30,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 20,
  },
  floatingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  storeButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  showcaseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    marginHorizontal: 24,
    gap: 8,
  },
  showcaseButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webViewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  webViewTitle: {
    flex: 1,
    textAlign: "center",
  },
  webView: {
    flex: 1,
  },
  commentsSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  commentsTitle: {
    marginBottom: 16,
  },
  commentInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  authorInput: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 12,
    gap: 6,
  },
  submitButtonDisabled: {
    backgroundColor: "#c7c7cc",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  commentsList: {
    gap: 12,
  },
  commentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  commentMeta: {
    marginLeft: 10,
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    color: "#333",
  },
  commentDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  commentContent: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  noComments: {
    alignItems: "center",
    paddingVertical: 30,
  },
  noCommentsText: {
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
  ratingInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingVertical: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: "#666",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  commentRating: {
    marginLeft: "auto",
  },
});
