export const roots = {
  auth: {
    login: '/users/sign_in',
    signup: '/candidates/signup',
    uploadcv: '/candidates/uploadcv',
    upLoadImage: '/candidates/uploadimage',
    countries: '/countries',
    getUserData: '/get-user-data',
    forgetPassword: '/forget-password',
  },
  home: {
    globalBarSearch: '/users/global-bar-search',
    hiring_by_area: '/companys/hiring_by_area',
    job_recommended_for_you: '/job_offers/job_recommended_for_you',
    job_offers: '/job_offers',
    job_offers_search: '/job_offers/search',
    apply_for_job: '/job_applications/apply_for_job',
    profile: '/candidates/profile',
    resume: '/resumes/add_resume',
    edit_resume: '/resumes/update_resume',
    getResume: '/resumes/get_resume_by_candidate',
    interview: '/interviews/filter_interviews_by_candidate',
    detailsInterView: '/interviews/interview_detail',
    notification: '/notifications/mobile',
    applyJob: "/applyJob"
  },
  profile: {
    editProfile: '/profile/edit'
  },
  scheduler: {
    events: '/events'
  }
}
