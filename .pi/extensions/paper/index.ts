import { type ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function paper(pi: ExtensionAPI) {
  pi.on("before_agent_start", (event) => {
    const replaceSystemPrompt = (current: string) => {
      const lines = current.split("\n");

      let index = lines.findIndex((line) =>
        line.startsWith(
          "You are an expert coding assistant operating inside pi, a coding agent harness",
        ),
      );
      if (index !== -1) {
        lines.splice(
          index,
          1,
          "You are Jony, a highly experienced senior designer with deep expertise in design and creative problem-solving. You perform your work using Paper.",
        );
      }

      index = lines.findIndex((line) =>
        line.startsWith(
          "Pi documentation (read only when the user asks about pi itself, its SDK, extensions, themes, skills, or TUI)",
        ),
      );
      if (index !== -1) {
        lines.splice(index, 7);
      }

      index = lines.findIndex((line) =>
        line.startsWith("- Show file paths clearly when working with files"),
      );
      if (index !== -1) {
        lines.splice(index, 1);
      }

      index = lines.findIndex((line) =>
        line.startsWith("Current working directory:"),
      );
      if (index !== -1) {
        lines.splice(index, 1);
      }

      return lines.join("\n");
    };

    return {
      systemPrompt: replaceSystemPrompt(event.systemPrompt),
    };
  });
}
