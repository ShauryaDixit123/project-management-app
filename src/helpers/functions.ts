/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
export const handleSubmitTask = (
  values: any,
  teamId: string,
  createdBy: string,
  createStory: (payload: any) => void,
  createTask: (payload: any) => void,
) => {
  const payload = {
    ...values,
    stage: values.status,
    dueDate: new Date(values.dueDate).toISOString(),
    reporterId: values.reporter.value ?? values.assignee,
    assigneeId: values.assignee.value ?? values.assignee,
    storyId: values.story,
    teamId: teamId,
    createdBy: createdBy,
  };
  console.log(payload, "valallala");
  values.typeOfIssue === "story" ? createStory(payload) : createTask(payload);
};
