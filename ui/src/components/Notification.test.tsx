import { describe, it, expect, vi, afterEach } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AlertColor } from "@mui/material";
import Notification from "./Notification";

const renderNotification = (
  props: Partial<React.ComponentProps<typeof Notification>> = {},
) =>
  render(<Notification open severity="success" message="Saved" {...props} />);

describe("Notification", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders nothing when closed", () => {
    renderNotification({ open: false });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows the message in an alert when open", () => {
    renderNotification({ message: "Concept added" });
    expect(screen.getByRole("alert")).toHaveTextContent("Concept added");
  });

  it("renders an empty alert when no message is given", () => {
    renderNotification({ message: undefined });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it.each<AlertColor>(["success", "info", "warning", "error"])(
    "applies the %s severity",
    (severity) => {
      renderNotification({ severity });
      const cap = severity[0].toUpperCase() + severity.slice(1);
      expect(screen.getByRole("alert")).toHaveClass(`MuiAlert-color${cap}`);
    },
  );

  it("calls onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderNotification({ onClose });

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("hides the close button when no onClose is given", () => {
    renderNotification({ onClose: undefined });
    expect(
      screen.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderNotification({ onClose });

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("auto-hides after 5 seconds", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    renderNotification({ onClose });

    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not start the auto-hide timer while closed", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    renderNotification({ open: false, onClose });

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
