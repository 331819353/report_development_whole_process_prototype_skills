# Prototype Story Design Thinking

Use this before page layout, component selection, visual styling, or runnable prototype implementation.

原型设计本质上不是先做界面，而是先把“要讲清楚什么故事”想明白，因为原型最终是要说服别人理解产品价值，而不只是画图。

The interface exists to make that story visible, usable, and believable.

Core principle:

```text
路径清晰 > 结构合理 > 细节够用
```

Working ratio:

- 70% in flow design.
- 20% in information structure.
- 10% in visual expression.

## 1. 先定“这东西到底要讲什么”（核心叙事）

First define what the prototype must make clear.

Answer:

- Which user or reviewer needs to understand this product, page, feature, or report?
- What problem does it solve?
- In what scenario will the user use it?
- What one-sentence value should the reviewer remember?

Example:

```text
让运营不用写代码也能快速搭活动页
```

This is the prototype theme. If this sentence is vague, the page and module design will scatter.

## 2. 梳理用户路径（而不是页面）

Do not start by counting pages. First describe the path:

```text
进入 -> 使用 -> 完成目标
```

Break the path into:

- Entry: where the user comes from, such as home page, link, push, menu, or external system.
- First action: what the user does first and why.
- Core flow: the key operation chain.
- Result feedback: success, failure, empty, pending, partial, or no-permission result.

This is the flow design layer. It decides whether the prototype can be understood as a usable product instead of a set of screens.

## 3. 再拆功能模块（信息架构）

After the path is clear, split content into roles:

- Main functions: must appear and carry the story.
- Supporting functions: useful, but visually weaker.
- Information display: non-interactive context, explanation, status, evidence, or trust details.

不要平均用力，要分“主角”和“配角”。A prototype needs protagonist and supporting roles; otherwise it becomes a feature pile.

## 4. 设计“关键决策点”（体验重点）

A good prototype usually needs to explain only two or three key experience points.

For each key point, decide:

- What choice or judgment the user needs to make.
- Why the user would choose one path instead of another.
- What could increase understanding cost.
- Which defaults, guidance, error prompts, and success feedback are needed.

These points deserve stronger interaction/state design than ordinary information blocks.

For report prototypes, a key decision point must reduce judgment effort. It should name the primary question, the comparison or threshold used for judgment, the evidence that explains why, and the next drilldown/action when the user wants to verify or act.

## 5. 补齐展示层（让别人看得懂）

The prototype is often reviewed by product managers, engineering, stakeholders, and decision makers. 很多优秀原型，其实是“半文档 + 半产品”:

```text
半文档 + 半产品
```

Make the presentation understandable:

- Use explanatory titles where they help reviewers scan.
- Show flow marks, steps, or arrows when the path would otherwise be hidden.
- Annotate key logic, assumptions, states, and boundaries.
- Make the whole structure understandable in about 30 seconds.

## 6. 最后做一次“讲故事式走查”

Before delivery, walk through the prototype from the user's point of view.

Check:

- Can the user enter, act, and finish the goal without getting stuck?
- Does the prototype require verbal explanation to make sense?
- Are there logic jumps between steps?
- Are there extra steps, repeated modules, or average-weight content that weaken the story?

If the story cannot be told smoothly, the prototype is not ready even if the pages look complete.

## Required Output

- Core narrative: user/problem/scenario/one-sentence value.
- User path: entry, first action, core flow, result feedback.
- Functional architecture: main functions, supporting functions, information display.
- Key decision points with default, guidance, comparison basis, evidence path, drilldown/action route, error, success, and edge states.
- Presentation plan: explanation titles, flow marks, annotations, and 30-second review path.
- Walkthrough risks: stuck points, logic jumps, explanation dependencies, and removable steps.

## Quality Gate

- Do not start from interface, page count, chart count, or visual style.
- Do not treat a prototype as only a UI drawing; it must explain product value.
- Do not average-weight all modules.
- Do not hide the entry path, first action, result feedback, or failure/no-permission state.
- Do not deliver a prototype that needs the designer beside it to explain the main story.
