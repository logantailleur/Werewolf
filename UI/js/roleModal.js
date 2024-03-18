export const roleModalHTML = `            

<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 id="viewRoleTitle" class="modal-title"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body text-center justify-content-center">
            <div class="role-assign-image">
                <img alt="Role Assignment Image" class="img-fluid mx-auto d-block">
            </div>
            <div class="font-weight-bold">Objective</div>
            <div id="viewRoleObjective"></div>
            <div class="font-weight-bold">Abilities</div>
            <div id="viewRoleAbilities"></div>
        </div>
    </div>
</div>

`;