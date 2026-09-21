import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import DashboardSidebar from "../components/Dashboardsidebar";
import "./Dashboard.css";

const API_URL = "http://localhost:5000";

export default function Dashboard() {

  const { user, loading: authLoading } = useAuth();

  const [roadmap, setRoadmap] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!user?.uid) return;

    const loadDashboard = async () => {
      try {

        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/roadmap/${user.uid}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load dashboard"
          );
        }

        setRoadmap(result.user.roadmap || []);
        setProfile(result.user.onboardingData || {});

      } catch (err) {

        console.error(err);
        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

    loadDashboard();

  }, [user]);

  const statistics = useMemo(() => {

    let subjects = roadmap.length;
    let completedSubjects = 0;

    let topics = 0;
    let completedTopics = 0;

    let subtopics = 0;
    let completedSubtopics = 0;

    roadmap.forEach((subject) => {

      if (subject.completed) {
        completedSubjects++;
      }

      subject.topics?.forEach((topic) => {

        topics++;

        if (topic.completed) {
          completedTopics++;
        }

        topic.subtopics?.forEach((subtopic) => {

          subtopics++;

          if (subtopic.completed) {
            completedSubtopics++;
          }

        });

      });

    });

    const progress =
      subtopics > 0
        ? Math.round(
            (completedSubtopics / subtopics) * 100
          )
        : topics > 0
        ? Math.round(
            (completedTopics / topics) * 100
          )
        : 0;

    return {
      subjects,
      completedSubjects,
      topics,
      completedTopics,
      subtopics,
      completedSubtopics,
      progress,
    };

  }, [roadmap]);

  const updateProgress = async ({
    subjectId,
    topicId,
    subtopicId,
    completed,
  }) => {

    try {

      const response = await fetch(
        `${API_URL}/api/roadmap/${user.uid}/progress`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            subjectId,
            topicId,
            subtopicId,
            completed,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update progress"
        );
      }

      setRoadmap(result.roadmap);

    } catch (err) {

      console.error(err);
      setError(err.message);

    }
  };

  if (authLoading || loading) {

    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Preparing your PrepForge workspace...</p>
      </div>
    );

  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {

    return (
      <div className="dashboard-error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );

  }

  if (!roadmap.length) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="dashboard-page">

      <DashboardSidebar />

      <main className="dashboard-main">

        {/* TOP NAV */}

        <header className="dashboard-topbar">

          <div>
            <span className="dashboard-label">
              PREPFORGE WORKSPACE
            </span>

            <h1>
              Welcome back,{" "}
              {user.displayName ||
                profile.name ||
                "Learner"}
              .
            </h1>
          </div>

          <div className="topbar-user">

            <div className="topbar-avatar">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <strong>
                {user.displayName || "Learner"}
              </strong>

              <small>
                {profile.targetRole || "Career preparation"}
              </small>
            </div>

          </div>

        </header>


        {/* HERO */}

        <section className="dashboard-hero">

          <div className="hero-content">

            <span className="hero-label">
              YOUR PERSONALIZED ROADMAP
            </span>

            <h2>
              Your path to becoming
              <br />
              interview ready.
            </h2>

            <p>
              PrepForge has created a personalized
              learning roadmap based on your goals,
              current skills and preparation timeline.
            </p>

            <div className="hero-tags">

              {profile.targetRole && (
                <span>{profile.targetRole}</span>
              )}

              {profile.dailyStudyHours && (
                <span>
                  {profile.dailyStudyHours} hrs/day
                </span>
              )}

              {profile.targetDuration && (
                <span>
                  {profile.targetDuration}
                </span>
              )}

            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>

            <div className="hero-mountain">
              <div className="mountain mountain-one"></div>
              <div className="mountain mountain-two"></div>
              <div className="mountain mountain-three"></div>
            </div>

          </div>

        </section>


        {/* PROGRESS */}

        <section
          className="progress-section"
          id="progress"
        >

          <div className="section-heading">

            <div>
              <span>YOUR PROGRESS</span>
              <h2>Keep moving forward</h2>
            </div>

            <strong>
              {statistics.progress}% complete
            </strong>

          </div>


          <div className="progress-grid">

            <article className="progress-card main-progress">

              <div
                className="progress-ring"
                style={{
                  "--progress":
                    `${statistics.progress * 3.6}deg`,
                }}
              >
                <div>
                  <strong>
                    {statistics.progress}%
                  </strong>

                  <span>complete</span>
                </div>
              </div>

              <div>

                <span className="card-label">
                  ROADMAP COMPLETION
                </span>

                <h3>
                  {statistics.completedSubtopics} of{" "}
                  {statistics.subtopics} subtopics
                </h3>

                <p>
                  Complete your roadmap step by step.
                  Every completed concept takes you
                  closer to your target role.
                </p>

              </div>

            </article>


            <article className="progress-card">

              <span className="card-label">
                SUBJECTS
              </span>

              <strong className="big-number">
                {statistics.completedSubjects}
                <small>
                  /{statistics.subjects}
                </small>
              </strong>

              <p>
                subjects completed
              </p>

            </article>


            <article className="progress-card">

              <span className="card-label">
                TOPICS
              </span>

              <strong className="big-number">
                {statistics.completedTopics}
                <small>
                  /{statistics.topics}
                </small>
              </strong>

              <p>
                topics completed
              </p>

            </article>

          </div>

        </section>


        {/* ROADMAP */}

        <section
          className="roadmap-section-wrapper"
          id="roadmap"
        >

          <div className="section-heading roadmap-heading">

            <div>

              <span>LEARNING PATH</span>

              <h2>
                Your personalized roadmap
              </h2>

              <p>
                Follow the roadmap generated specifically
                for your preparation goals.
              </p>

            </div>

          </div>


          <div className="roadmap-list">

            {roadmap.map(
              (subject, subjectIndex) => (

                <article
                  className="roadmap-subject"
                  key={subject.id}
                >

                  <div className="subject-number">
                    {String(subjectIndex + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>


                  <div className="subject-content">

                    <div className="subject-header">

                      <div>

                        <span className="subject-label">
                          SUBJECT
                        </span>

                        <h3>
                          {subject.subject}
                        </h3>

                      </div>

                      <div className="subject-progress">
  <strong>
    {subject.topics.filter(topic => topic.completed).length}
    /
    {subject.topics.length || 0}
  </strong>
</div>

                    </div>


                    <div className="topic-list">

                      {subject.topics?.map(
                        (topic) => (

                          <div
                            className={
                              topic.completed
                                ? "topic-card completed"
                                : "topic-card"
                            }
                            key={topic.id}
                          >

                            <div className="topic-main">

                              <button
                                className="topic-check"
                                onClick={() =>
                                  updateProgress({
                                    subjectId:
                                      subject.id,
                                    topicId:
                                      topic.id,
                                    completed:
                                      !topic.completed,
                                  })
                                }
                              >
                                {topic.completed
                                  ? "✓"
                                  : ""}
                              </button>

                              <div>

                                <h4>
                                  {topic.name}
                                </h4>

                                <span>
                                  {
                                    topic.subtopics
                                      ?.length || 0
                                  } subtopics
                                </span>

                              </div>

                            </div>


                            <div className="subtopic-list">

                              {topic.subtopics?.map(
                                (subtopic) => (

                                  <label
                                    className={
                                      subtopic.completed
                                        ? "subtopic completed"
                                        : "subtopic"
                                    }
                                    key={
                                      subtopic.id
                                    }
                                  >

                                    <input
                                      type="checkbox"
                                      checked={
                                        subtopic.completed
                                      }
                                      onChange={() =>
                                        updateProgress({
                                          subjectId:
                                            subject.id,
                                          topicId:
                                            topic.id,
                                          subtopicId:
                                            subtopic.id,
                                          completed:
                                            !subtopic.completed,
                                        })
                                      }
                                    />

                                    <span className="subtopic-check">
                                      ✓
                                    </span>

                                    <span>
                                      {subtopic.name}
                                    </span>

                                  </label>

                                )
                              )}

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        </section>

      </main>

    </div>
  );
}