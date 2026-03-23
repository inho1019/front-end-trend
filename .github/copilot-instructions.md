When performing a code review, respond in Korean.

When performing a code review, begin every review comment with the exact text [REPO-INSTRUCTION-CHECK].

When performing a code review, for every finding include both labels 원인: and 영향: in the comment body.

When performing a code review, if no issues are found, leave exactly one summary comment that includes the exact text NO-FINDINGS-INSTRUCTION-CHECK.

When performing a code review, list findings first, ordered by severity.

When performing a code review, prioritize:

- bugs and regressions
- type safety issues
- missing tests
- unnecessary logs and dead code

When performing a code review, include the reason and likely impact for each finding.

When performing a code review, apply the checks in the `.agents/skills/code-review/SKILL.md` file.

When performing a code review, when first commenting say "코드 리뷰를 시작하겠습니다.☺️" and when finishing say "코드 리뷰를 마치겠습니다.☺️".
