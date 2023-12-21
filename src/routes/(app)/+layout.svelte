<script>
    import { fade } from 'svelte/transition';
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
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

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

<div in:fade={{ duration: 300 }} class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
            <div class="app-brand demo">
                <span class="app-brand-text demo menu-text fw-bold ms-2">Aja-Aja</span>
            </div>

            <div class="menu-inner-shadow"></div>

            <ul class="menu-inner py-1">
                <li class="menu-item">
                    <a href="/members" class="menu-link menu-toggle">
                        <div>가입한 회원</div>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="/withdrawn-members" class="menu-link menu-toggle">
                        <div>탈퇴한 회원</div>
                    </a>
                </li>
            </ul>
        </aside>

        <div class="layout-page">
            <div class="content-wrapper">
                <div class="container-xxl flex-grow-1 container-p-y">
                    <slot></slot>
                </div>
            </div>
            <div class="layout-overlay layout-menu-toggle"></div>
        </div>
    </div>
</div>


