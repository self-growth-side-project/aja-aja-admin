<script lang="ts">
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let isLoginFailed = false

    async function handleLogin() {
        isLoginFailed = false;

        const response = await fetch('http://15.165.249.34:8602/v1/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            isLoginFailed = true;
            return;
        }

        const data = await response.json();


        const accessToken =  data.data.accessToken;
        const refreshToken =  data.data.refreshToken;

        if (!checkRole(accessToken)) {
            isLoginFailed = true;
            return;
        }

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        goto('/members');
    }

    function checkRole(token: string): boolean {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        return payload.role === 'ADMIN';
    }
</script>

<svelte:head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="description" content="" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../../../../assets/vendor/css/core.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="../../../../assets/vendor/css/theme-default.css" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="../../../../assets/css/demo.css" />
    <link rel="stylesheet" href="../../../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="../../../../assets/vendor/css/pages/page-auth.css" />

    <script src="../../../../assets/vendor/js/helpers.js"></script>
    <script src="../../../../assets/js/config.js"></script>
    <script src="../../../../assets/vendor/libs/jquery/jquery.js"></script>
    <script src="../../../../assets/vendor/libs/popper/popper.js"></script>
    <script src="../../../../assets/vendor/js/bootstrap.js"></script>
    <script src="../../../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="../../../../assets/vendor/js/menu.js"></script>
    <script src="../../../../assets/js/main.js"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
</svelte:head>


<div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
            <div class="card">
                <div class="card-body">
                    <div class="app-brand justify-content-center">
                        <h4 class="mb-2">Welcome to Aja-Aja Admin 👋</h4>
                    </div>

                    <form class="mb-3" on:submit|preventDefault={handleLogin} autocomplete="on">
                        <div class="mb-3">
                            <label for="email" class="form-label">이메일</label>
                            <input
                                    type="text"
                                    class="form-control {isLoginFailed ? 'is-invalid-input' : ''}"
                                    id="email"
                                    bind:value={email}
                                    name="email"
                                    placeholder="이메일을 입력해주세요."
                                    autocomplete="email"
                                    required
                            />
                        </div>
                        <div class="mb-3 form-password-toggle">
                            <div class="d-flex justify-content-between">
                                <label class="form-label" for="password">비밀번호</label>
                            </div>
                            <div class="input-group input-group-merge">
                                <input
                                        type="password"
                                        id="password"
                                        bind:value={password}
                                        class="form-control {isLoginFailed ? 'is-invalid-input' : ''}"
                                        name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password"
                                        autocomplete="current-password"
                                        required/>
                                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                            </div>

                        </div>
                        <div class="mb-3">
                            <button class="btn btn-primary d-grid w-100" type="submit">로그인</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .is-invalid-input {
        border-color: #dc3545;
        padding-right: calc(1.5em + 0.75rem);
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
        background-image: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 12 12\' fill=\'#dc3545\'%3E%3Cpath d=\'M11.493 1.493a1.75 1.75 0 0 0-2.475 0L6 4.511 3.982 2.493a1.75 1.75 0 1 0-2.475 2.475L4.511 6l-2.004 2.018a1.75 1.75 0 1 0 2.475 2.475L6 7.489l2.018 2.018a1.75 1.75 0 1 0 2.475-2.475L7.489 6l2.004-2.018a1.75 1.75 0 0 0 0-2.475z\'/%3E%3C/svg%3E');
    }

    .is-invalid-input:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
</style>

