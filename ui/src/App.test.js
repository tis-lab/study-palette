"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var user_event_1 = require("@testing-library/user-event");
var vitest_1 = require("vitest");
var App_1 = require("./App");
var demoData_1 = require("./demoData");
var mockStudies = {
    studies: [
        {
            id: "phs000001",
            name: "Test Study",
            description: "A test study.",
            participant_count: 100,
        },
    ],
    total: 1,
};
var mockConditions = {
    conditions: [{ condition_concept: "MONDO:0004979", condition_status: "PRESENT", count: 30 }],
};
var mockParticipants = {
    participants: [{ id: 1, sex: "OMOP:8507", race: "OMOP:8527" }],
    total: 1,
};
(0, vitest_1.describe)("App", function () {
    (0, vitest_1.beforeEach)(function () {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)("renders the header", function () {
        (0, react_1.render)(<App_1.default />);
        (0, vitest_1.expect)(react_1.screen.getByText("Study Palette")).toBeInTheDocument();
    });
    (0, vitest_1.it)("defaults to demo mode with overview charts", function () {
        (0, react_1.render)(<App_1.default />);
        (0, vitest_1.expect)(react_1.screen.getByText("Demo Data")).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText("Conditions")).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText("Procedures")).toBeInTheDocument();
    });
    (0, vitest_1.it)("switches to live mode and fetches from API", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(global, "fetch").mockImplementation(function (url) {
                        var urlStr = String(url);
                        if (urlStr.includes("/conditions")) {
                            return Promise.resolve({ ok: true, json: function () { return Promise.resolve(mockConditions); } });
                        }
                        if (urlStr.includes("/participants")) {
                            return Promise.resolve({ ok: true, json: function () { return Promise.resolve(mockParticipants); } });
                        }
                        return Promise.resolve({ ok: true, json: function () { return Promise.resolve(mockStudies); } });
                    });
                    (0, react_1.render)(<App_1.default />);
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByText("Demo Data"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            (0, vitest_1.expect)(react_1.screen.getByText("Live API")).toBeInTheDocument();
                            (0, vitest_1.expect)(react_1.screen.getByText("Test Study")).toBeInTheDocument();
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("shows filter panel with hint in demo mode", function () {
        (0, react_1.render)(<App_1.default />);
        (0, vitest_1.expect)(react_1.screen.getByText("Filters")).toBeInTheDocument();
        (0, vitest_1.expect)(react_1.screen.getByText("Click a chart segment to filter")).toBeInTheDocument();
    });
    (0, vitest_1.it)("shows filter panel with no-filter hint and correct participant count", function () {
        (0, react_1.render)(<App_1.default />);
        var filterPanel = react_1.screen.getByText("Filters").closest(".filter-panel");
        (0, vitest_1.expect)(demoData_1.DEMO_PARTICIPANTS.length).toBe(1000);
        (0, vitest_1.expect)((0, react_1.within)(filterPanel).getByText("Click a chart segment to filter")).toBeInTheDocument();
    });
    (0, vitest_1.it)("offers both figure palettes and keeps charts rendering after a switch", function () { return __awaiter(void 0, void 0, void 0, function () {
        var picker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, react_1.render)(<App_1.default />);
                    picker = react_1.screen.getByLabelText("Figure palette");
                    (0, vitest_1.expect)(picker).toHaveValue("tol");
                    return [4 /*yield*/, user_event_1.default.selectOptions(picker, "okabe")];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(picker).toHaveValue("okabe");
                    (0, vitest_1.expect)(react_1.screen.getByText("Conditions")).toBeInTheDocument();
                    (0, vitest_1.expect)(react_1.screen.getByText("Procedures")).toBeInTheDocument();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("shows error on fetch failure in live mode", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(global, "fetch").mockResolvedValue({
                        ok: false,
                        status: 500,
                        json: function () { return Promise.resolve({}); },
                    });
                    (0, react_1.render)(<App_1.default />);
                    return [4 /*yield*/, user_event_1.default.click(react_1.screen.getByText("Demo Data"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, react_1.waitFor)(function () {
                            (0, vitest_1.expect)(react_1.screen.getByText(/Error/)).toBeInTheDocument();
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
