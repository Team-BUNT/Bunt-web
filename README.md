# Introduce Team

<center><img src="https://user-images.githubusercontent.com/61782746/199677768-cb7b52b1-1b99-417e-9fc1-16affe716bc0.png" width="300" height="300"></center>

> **_Life is on stage_** > **_댄스를 더 가볍게 모두가 스트릿 댄스를 즐길 수 있도록_**

## Product Description

제휴를 맺은 스튜디오들의 수강생들이 신청폼을 입력하여 수업을 수강하는 서비스입니다.

**서비스 이용 시 Bunt팀에서 기대하는 효과는**

1. 수강생들이 매번 변화하는 스튜디오 클래스 상황을 손쉽게 확인할 수 있습니다.
2. Class를 관리하는 관리자 앱을 통해 관리자는 등록한 수강생들의 결제, 출석 현황을 손쉽게 관리합니다.

## Develop

**Stack**

- Next

### Router

- / : 랜딩페이지를 보여줍니다.
- /studio : 제휴맺은 스튜디오 리스트를 보여준다.
- /studio/[id]/login : 이름과 전화번호가 있는 form이 나옵니다.
- /studio/[id]/form : 이름과 전화번호를 이용하여 firebase에 있는 값과 비교 후 form을 보여줍니다.

### Todo

#### Refactor Bunt-web

[MileStone](https://github.com/Team-BUNT/Bunt-web/milestone/2)

- [ ] 프로젝트 구조 개편 및 Component 재구성 (https://github.com/Team-BUNT/Bunt-web/issues/8)
- [ ] Firebase Api 호출 로직 개선 및 모델 분리 (https://github.com/Team-BUNT/Bunt-web/issues/9)
- [ ] Validation을 위한 모델 로직 분리 (https://github.com/Team-BUNT/Bunt-web/issues/10)

#### Update form

[MileStone](https://github.com/Team-BUNT/Bunt-web/milestone/3)

- [ ] Landing page 제작을 위한 index 수정 (https://github.com/Team-BUNT/Bunt-web/issues/11)
- [ ] 각 Router에 해당하는 View 제작 (https://github.com/Team-BUNT/Bunt-web/issues/11)
- [ ] Form 제작을 위한 Router 설정 (https://github.com/Team-BUNT/Bunt-web/issues/12)
